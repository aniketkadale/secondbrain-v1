"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MONGO_URI_LOCAL = "mongodb://localhost:27017/secondbrain";
mongoose_1.default.connect(MONGO_URI_LOCAL);
mongoose_1.default.connection.on("connected", () => {
    console.log("Mongodb connected");
});
mongoose_1.default.connection.on("disconnected", () => {
    console.log("Mongodb disconnected");
});
mongoose_1.default.connection.on("error", () => {
    console.log("Error while connecting to Mongodb");
});
