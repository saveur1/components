import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { NextFunction, type Request, type Response, type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { asyncCatch, ErrorHandler } from "@/middleware/errorHandler";
import { ServiceResponse } from "@/utils/serviceResponse";

export const healthCheckRegistry = new OpenAPIRegistry();
export const healthCheckRouter: Router = express.Router();

healthCheckRegistry.registerPath({
    method: "get",
    path: "/health-check",
    tags: ["Health Check"],
    responses: createApiResponse(z.null(), "Success"),
});

healthCheckRouter.get("/", asyncCatch((_req: Request, res: Response, next: NextFunction) => {
    return ServiceResponse.success("Service is healthy", null, undefined, res );
}));
