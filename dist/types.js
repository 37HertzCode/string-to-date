"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TokenType;
(function (TokenType) {
    TokenType["subtract"] = "subtract";
    TokenType["add"] = "add";
    TokenType["day"] = "day";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
function isDayToken(token) {
    return token.type === TokenType.day;
}
exports.isDayToken = isDayToken;
