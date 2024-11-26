import { StatusCodes } from "http-status-codes";
import { ServiceResponse } from "@/utils/serviceResponse";
import { logger } from "@/server";
import { UserRepository } from "./userRepository";
import { User } from "./userModel";

export class UserService {
  private userRepository: UserRepository;

  constructor(repository: UserRepository = new UserRepository()) {
    this.userRepository = repository;
  }

 

  
}

export const userService = new UserService();
