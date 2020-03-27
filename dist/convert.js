"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokenizer_1 = require("./tokenizer");
const types_1 = require("./types");
function convert(inputString) {
    let tokens = tokenizer_1.tokenizer(inputString);
    let date = new Date();
    if (tokens[0] && tokens[0].type === types_1.TokenType.day) {
        let firstToken = tokens.shift();
        switch (firstToken.value) {
            case "today":
                date.setHours(0, 0, 0, 0);
                break;
            case "tomorrow":
                date.setHours(24, 0, 0, 0);
                break;
            case "yesterday":
                date.setHours(-24, 0, 0, 0);
                break;
            default:
                // as long as tokenizer and convert are in sync, this should be never reached
                throw new TypeError(`First token value '${firstToken.value}' is invalid.`);
        }
    }
    for (let token of tokens) {
        if (types_1.isDayToken(token)) {
            throw new TypeError(`Only first token is allowed to be of type 'day'`);
        }
        // milliseconds to add or subtract to current date
        let timeToChange = 0;
        switch (token.unit) {
            case "msec":
            case "millisecond":
            case "milliseconds":
                timeToChange = token.number;
                break;
            case "sec":
            case "second":
            case "seconds":
                timeToChange = token.number * 1000;
                break;
            case "min":
            case "minute":
            case "minutes":
                timeToChange = token.number * 1000 * 60;
                break;
            case "hrs":
            case "hour":
            case "hours":
                timeToChange = token.number * 1000 * 60 * 60;
                break;
            case "day":
            case "days":
                timeToChange = token.number * 1000 * 60 * 60 * 24;
                break;
            case "week":
            case "weeks":
                timeToChange = token.number * 1000 * 60 * 60 * 24 * 7;
                break;
            case "month":
            case "months":
                timeToChange = 0;
                date.setMonth(date.getMonth() + token.number * (token.type === "add" ? 1 : -1));
                break;
            case "year":
            case "years":
                timeToChange = 0;
                date.setFullYear(date.getFullYear() + token.number * (token.type === "add" ? 1 : -1));
                break;
            default:
                throw new TypeError(`Invalid token unit '${token.unit}'.`);
        }
        if (timeToChange > 0) {
            date.setTime(date.getTime() + timeToChange * (token.type === "add" ? 1 : -1));
        }
    }
    return date;
}
exports.convert = convert;
