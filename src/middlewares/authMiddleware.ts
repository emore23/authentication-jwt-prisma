import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../helpers/api-errors";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma/client";

type JwtPayload = {
  user_id: number;
};

enum UserRoles {
  OWNER = 3,
  ADMIN = 1,
}

export const authMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError("Não autorizado");
  }

  const token = authorization.split(" ")[1];

  try {
    const { user_id } = jwt.verify(
      token,
      process.env.JWT_PASS ?? ""
    ) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: {
        user_id: user_id,
      },
    });

    if (!user) {
      throw new UnauthorizedError("Não autorizado");
    }

    const { password: _, roleRole_id, ...loggedUser } = user;

    // Verifique as funções do usuário
    if (!userHasPermission(roleRole_id, req)) {
      throw new UnauthorizedError("Não autorizado");
    }

    req.user = {
      ...loggedUser,
    };

    next();
  } catch (error) {
    console.error("Erro no middleware authMiddleware:", error);
    return res.status(401).json({ error: "Não autorizado" });
  }
};

// Função para verificar permissões do usuário
export const userHasPermission = (userRoles: number | null, req: Request) => {
  // Verifique se o usuário tem a permissão necessária com base nas suas roles
  // Neste exemplo, verificamos se o usuário é "owner" ou "Admin"
  return userRoles === UserRoles.OWNER || userRoles === UserRoles.ADMIN;
};
