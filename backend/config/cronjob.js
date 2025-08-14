import cron from "node-cron";
import sendEmail from "./sendEmail.js";
import { subDays, startOfDay, endOfDay } from "date-fns"; // missing imports
import RequestModel from "../models/connectionRequest.model.js";

const cronJob = () => {
  cron.schedule("06 15 * * *", async () => {
    console.log("📅 Cron job started at 8:00 AM");

    try {
      const yesterday = subDays(new Date(), 0);
      const start = startOfDay(yesterday);
      const end = endOfDay(yesterday);

      const pendingRequests = await RequestModel.find({
        status: "interested",
        createdAt: {
          $gte: start,
          $lte: end,
        },
      }).populate("fromUserId toUserId", "email");

      const listOfEmails = [
        ...new Set(pendingRequests.map((req) => req.fromUserId?.email)),
      ].filter(Boolean);

      console.log("📨 Sending emails to:", listOfEmails);

      for (const email of listOfEmails) {
        await sendEmail.run(
          "New Friend Request Pending", // subject
          "You have new friend requests pending for you. Please check your DevTinder account.", // body
          email // recipient email
        );
        console.log("✅ Email sent to", email);
      }
    } catch (error) {
      console.error("❌ Error in cron job:", error.message);
    }
  });
};

export default cronJob;
