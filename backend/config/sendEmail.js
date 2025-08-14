import { SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "./sesClient.js";

const createSendEmailCommand = (
  toAddress,
  fromAddress,
  subject,
  textBody,
  htmlBody
) => {
  return new SendEmailCommand({
    Destination: {
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: htmlBody,
        },
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

const run = async () => {
  console.log("🚀 Starting SES email send...");

  const sendEmailCommand = createSendEmailCommand(
    "dheeraj.aggrigator@gmail.com", // recipient
    "dheeraj200011@gmail.com", // sender
    "Hello from AWS SES", // subject
    "This is the plain text version of the email.",
    "<h1>This is the HTML version</h1><p>Sent via AWS SES.</p>"
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
