const nodemailer = require("nodemailer");

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail", // use gmail for email services
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Function to send an email
const sendEmailNotification = async (attendee, sessionDetails) => {
  const mailOptions = {
    from: `"Session Manager" <${process.env.EMAIL}>`, // Sender's email
    to: attendee.email, // Recipeint email
    subject: "Session Updated", // Subject line
    text: `Dear ${attendee.name}, \n\nThe session has been updated. \n\nNew Start Time:${sessionDetails.newStart}\nNew End Time: ${sessionDetails.newEnd}\n\nBest regards,\nSession Manager`, // Email content
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${attendee.email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports=sendEmailNotification