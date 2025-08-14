import { SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "./sesClient.js";

const createSendEmailCommand = (toAddress, fromAddress, subject, textBody) => {
  return new SendEmailCommand({
    Destination: {
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: textBody,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: fromAddress, // must be verified in SES if in sandbox
  });
};

const run = async (subject, body, toEmailId) => {
  const sendEmailCommand = createSendEmailCommand(
    toEmailId, // recipient
    "dheeraj200011@gmail.com", // sender
    subject,
    body
  );

  try {
    const response = await sesClient.send(sendEmailCommand);
    console.log("✅ Email sent successfully:", response);
    return response;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
};

export default { run };
