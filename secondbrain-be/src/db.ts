import mongoose from "mongoose";

const MONGO_URI_LOCAL = "mongodb://localhost:27017/secondbrain";

mongoose.connect(MONGO_URI_LOCAL);

mongoose.connection.on("connected", () => {
  console.log("Mongodb connected");
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongodb disconnected");
});

mongoose.connection.on("error", () => {
  console.log("Error while connecting to Mongodb");
});
