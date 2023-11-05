import { Request, Response } from "express";
import { CreateUser } from "../repositories/createUser";

interface UserModel {
  name: string;
  email: string;
  password: string;
  roleId: number;
}

export class CreateUserController {
  async createUser(req: Request, res: Response) {
    const { name, email, password, roleId }: UserModel = req.body;

    const createUser = new CreateUser();

    const { password: _, ...user } = await createUser.execute({
      name,
      email,
      password,
      roleId,
    });

    return res.status(201).json(user);
  }
}
