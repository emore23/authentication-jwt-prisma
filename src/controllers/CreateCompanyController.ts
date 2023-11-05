import { Request, Response } from "express";
import { CreateCompany } from "../repositories/createCompany";
import { CompanyModel } from "../models/createCompany.model";
import { userHasPermission } from "../middlewares/authMiddleware";

export class CreateCompanyController {
  async createCompany(req: Request, res: Response) {
    const {
      company_id,
      slug,
      name,
      payment_options,
      address,
      picture,
    }: CompanyModel = req.body;

    const createCompany = new CreateCompany();

    // A criação da empresa só será permitida se o usuário tiver as funções necessárias
    // if (!userHasPermission(req.user.roleRole_id, req)) {
    //   return res.status(403).json({ error: "Permissão negada" });
    // }

    const { password: _, ...company } = await createCompany.execute({
      company_id,
      slug,
      name,
      payment_options,
      address,
      picture,
    });

    return res.status(201).json(company);
  }
}
