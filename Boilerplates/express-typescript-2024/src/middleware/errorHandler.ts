import type { ErrorRequestHandler, NextFunction, Request, RequestHandler, Response } from "express";
import { env } from "@/config/envConfig";
import { ServiceResponse } from "@/utils/serviceResponse";

//ADD 404 TO NOT FOUND ERROR
const unexpectedRequest: RequestHandler = (_req, res, next) => {
    return next(ErrorHandler.NotFound("Resources not found"));
};

//ADD ERROR TO REQUEST LOG
const addErrorToRequestLog: ErrorRequestHandler = (err, _req, res, next) => {
    res.locals.err = err;
    next(err);
};

//RETURN ERROR TO USER AS JSON
const returnErrorToUser: ErrorRequestHandler = (error, _req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.message = error.message || "Internal Server Error";

    if(env.NODE_ENV === "development") {
        res.status(error.statusCode).json({
            success:false,
            message: error.message,
            error,
            stack: error.stack
        })
    }

    if(env.NODE_ENV === "production"){

        if(error.name === "CastError") {
            const message = `Resource Not Found. Invalid ${error.path}`;
            error = new ErrorHandler(message,400);
        }

        if(error.message === "Could not decode base64") {
            const message = "Invalid Images uploaded. One Image shoud not exceed 1.2 mega bytes(MB)";
            error = new ErrorHandler(message,400);
        }

        if(error.name === "JsonWebTokenError"){
            const message = "JSON web token is invalid. Try Again!!!";
            error = new ErrorHandler(message,400);
        }

        if(error.name === "TokenExipiredError"){
            const message = "JSON web token is Expired. Try Again!!!";
            error = new ErrorHandler(message,400);
        }

        return ServiceResponse.failure(error.message || "Internal Server Error", null, error.statusCode, res);
    }
}

// HANDLE ERRORS BY ATTACHING STATUS CODE AND MESSAGES
export class ErrorHandler extends Error {
    readonly statusCode: number;

    constructor(message: string, statusCode: number){
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }

    static BadRequest(message: string) {
        return new ErrorHandler(message, 400);
    }
    
    static NotFound(message: string) {
        return new ErrorHandler(message, 404);
    }

    static InternalServerError(message = "Internal Server Error") {
        return new ErrorHandler(message, 500);
    }
}

//CATCH ASYNCHRONOUS ERROS
export const asyncCatch = (handler: any) => (req: Request,res: Response,next: NextFunction)=>
                               Promise.resolve( handler(req, res, next) )
                                       .catch( next );


export default () => [unexpectedRequest, addErrorToRequestLog, returnErrorToUser];
