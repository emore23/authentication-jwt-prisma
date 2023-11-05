import { User } from "@prisma/client";
import { prisma } from "../prisma/client";

interface CreateUserDTO {
  email: string;
}

export class LoginUser {
  async loginUser({ email }: CreateUserDTO): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
}
