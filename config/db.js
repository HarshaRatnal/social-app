const mongooose = require("mongoose");

const connectdb = async () => {
  try {
    await mongooose.connect(`${process.env.MONGO_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.error("App starting error:", error.message);
  }
};

module.exports = connectdb;