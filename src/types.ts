export enum TokenType {
    subtract = "subtract",
    add = "add",
    day = "day"
}

export interface DayToken {
    type: TokenType.day,
    value: string
}

export interface OperationToken {
    type: TokenType.add | TokenType.subtract,
    number: number,
    unit: string
}

export type Token = DayToken | OperationToken

export function isDayToken(token: Token): token is DayToken {
    return token.type === TokenType.day
}