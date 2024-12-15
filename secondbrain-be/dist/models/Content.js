"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ContentSchema = new Schema({
    link: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        enum: ["image", "audio", "youtube", "article", "twitter"],
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    tags: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "Tag",
        },
    ],
    userId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        required: true,
    },
});
exports.Content = mongoose_1.default.model("Content", ContentSchema);
