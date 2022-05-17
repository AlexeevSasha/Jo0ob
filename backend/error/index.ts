import {StatusCodes} from "http-status-codes";

class CustomAPIError extends Error{
    constructor(message : string) {
        super(message)
    }
}

export class BadRequestError extends CustomAPIError{
    statusCode: StatusCodes.BAD_REQUEST;
    constructor(message : string) {
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

export class UnauthenticatedError extends CustomAPIError{
    statusCode: StatusCodes.UNAUTHORIZED;
    constructor(message : string) {
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

export class NotFoundError extends CustomAPIError{
    statusCode: StatusCodes.NOT_FOUND;
    constructor(message : string) {
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}