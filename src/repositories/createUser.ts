import { User } from "@prisma/client";
import { BadRequestError } from "../helpers/api-errors";
import { prisma } from "../prisma/client";
import bcrypt from "bcrypt";

interface CreateUserDTO {
  email: string;
  name: string;
  password: string;
  roleId: number;
}

export class CreateUser {
  async execute({
    email,
    name,
    password,
    roleId,
  }: CreateUserDTO): Promise<User> {
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new BadRequestError("Email já existe");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        roles: {
          connect: { role_id: roleId },
        },
      },
    });

    return newUser;
  }
}
