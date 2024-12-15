"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateRandomHash(length = 12) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result; // Ensure to return the generated string
}
exports.default = generateRandomHash;
