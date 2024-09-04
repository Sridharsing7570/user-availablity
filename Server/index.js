require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const session = require("express-session");

const connectDB = require("./config/db");
const session = require("express-session");
const app = express();

// Connecting to mongoDb
connectDB();

// Middle to parse JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const PORT = process.env.PORT;

// routes
app.use("/", require("./routes/index"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
