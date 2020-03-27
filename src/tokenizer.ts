// @see https://www.php.net/manual/en/datetime.formats.relative.php

import {DayToken, OperationToken, Token, TokenType} from "./types";

let word = new RegExp(/^\w+/)
let expression = new RegExp(/^(\+|-)([0-9]+) ?(\w+)/, 'i') // eg.: +3day, -4 weeks
let whitespace = new RegExp(/\s+/)
let relDays = ['today', 'tomorrow', 'yesterday']
let startOfExpression = ['next', 'last', 'first', 'previous']


export function tokenizer(input: string): Token[] {
    let current = 0
    let tokens = []
    let match

    input = input.trim().toLowerCase()

    while (input.length > 0) {

        if (match = word.exec(input)) {
            if (relDays.indexOf(match[0]) > -1) {
                tokens.push({type: TokenType.day, value: match[0]} as DayToken)
                // @ts-ignore: .trimLeft() is not recognized
                input = input.substring(match[0].length).trimLeft()
                continue
            } else if (startOfExpression.indexOf(match[0]) > -1) {
                // things like first day of ...; last day of ...; next Thursday
                throw new Error("not yet implemented")
            } else {
                throw new Error("unknown word")
            }
        }

        let char = input[0]
        if (char === "+" || char === "-") {
            if (match = expression.exec(input)) {
                tokens.push({
                    type: char === "+" ? TokenType.add : TokenType.subtract,
                    number: parseInt(match[2]),
                    unit: match[3]
                } as OperationToken)
                // @ts-ignore: .trimLeft() is not recognized
                input = input.substring(match[0].length).trimLeft()
                continue
            } else {
                throw new Error("looks like it should be a relative expression, but is invalid. Valid format is (+|-)<number> <unit>")
            }
        }

        throw new TypeError(`Unhandled input on character ${char} at position ${current}`);
    }

    return tokens
}