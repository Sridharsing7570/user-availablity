const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("mongo db connected successfully");
  } catch (error) {
    console.log(error);
    console.error("Error connecting to mongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
