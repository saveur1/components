import type { Request, RequestHandler, Response } from "express";
import { UserRepository } from "./userRepository";
import { ServiceResponse } from "@/utils/serviceResponse";
import { StatusCodes } from "http-status-codes";
import { User } from "./userModel";
import { logger } from "@/server";

class UserController {
    private userRepository: UserRepository;

  constructor(repository: UserRepository = new UserRepository()) {
    this.userRepository = repository;
  }

  public getUsers: RequestHandler = async (_req: Request, res: Response) => {
    try {
        const users = await this.userRepository.findAllAsync();
        if (!users || users.length === 0) {
            return ServiceResponse.failure("No Users found", null, StatusCodes.NOT_FOUND, res);
        }

        return ServiceResponse.success<User[]>("Users found", users, undefined, res);
      } catch (ex) {
        const errorMessage = `Error finding all users: $${(ex as Error).message}`;
        logger.error(errorMessage);

        return ServiceResponse.failure(
            "An error occurred while retrieving users.",
            null,
            StatusCodes.INTERNAL_SERVER_ERROR,
            res
        );
      }
  };

  public getUser: RequestHandler = async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id as string, 10);
    try {
        const user = await this.userRepository.findByIdAsync(id);
        if (!user) {
            return ServiceResponse.failure("User not found", null, StatusCodes.NOT_FOUND, res);
        }

        return ServiceResponse.success<User>("User found", user, undefined, res);
    } catch (ex) {
        const errorMessage = `Error finding user with id ${id}:, ${(ex as Error).message}`;
        logger.error(errorMessage);
        return ServiceResponse.failure("An error occurred while finding user.", null, StatusCodes.INTERNAL_SERVER_ERROR, res);
    }
  };
}

export const userController = new UserController();
