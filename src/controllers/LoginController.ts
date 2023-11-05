import { Request, Response } from "express";
import { prisma } from "../prisma/client";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

export class LoginController {
  async loginUser(req: Request, res: Response): Promise<User | any> {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(400).json({ error: "E-mail ou senha inválidos" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ error: "E-mail ou senha inválidos" });
      }

      const token = jwt.sign(
        { user_id: user.user_id },
        process.env.JWT_PASS ?? "",
        {
          expiresIn: "8h",
        }
      );

      const { password: _, ...userWithoutPassword } = user;

      return res.json({
        user: userWithoutPassword,
        token: token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro no servidor" });
    }
  }

  async getProfile(req: any, res: Response) {
    return res.json(req.user);
  }
}
