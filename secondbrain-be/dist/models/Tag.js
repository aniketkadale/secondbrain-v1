"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tags = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const TagsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
});
exports.Tags = mongoose_1.default.model("Tags", TagsSchema);
