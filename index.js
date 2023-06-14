const express = require("express");
const app = express();
const dbConnect = require("./config/db");
const dotenv = require('dotenv');

dotenv.config();

dbConnect();

app.use(express.json());

app.use("/api/auth", require("./server/routes/api/auth"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  next();
});

const PORT = process.env.PORT || "5000";
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
