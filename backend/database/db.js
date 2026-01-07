require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env")
});

const mongoose = require("mongoose");

exports.connectToDB = async () => {
  try {
    console.log("MONGO_URI inside connectToDB:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("connected to DB");
  } catch (error) {
    console.log(error);
  }
};
