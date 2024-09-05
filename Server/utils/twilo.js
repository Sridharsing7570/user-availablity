const twilio = require("twilio");

// Your Twilio account credentials (replace with your actual credentials)
const accountSid = "your-account-sid"; // Get from Twilio dashboard
const authToken = "your-auth-token"; // Get from Twilio dashboard

// Create a Twilio client
const client = twilio(accountSid, authToken);

// Function to send an SMS
const sendSMSNotification = async (attendee, sessionDetails) => {
  try {
    await client.messages.create({
      body: `Dear ${attendee.name}, the session has been updated. New Start Time: ${sessionDetails.newStart}, New End Time: ${sessionDetails.newEnd}`,
      from: "+1234567890", // Your Twilio phone number
      to: attendee.phoneNumber, // Attendee's phone number
    });
    console.log(`SMS sent to ${attendee.phoneNumber}`);
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
};

// Export the function
module.exports = sendSMSNotification;
