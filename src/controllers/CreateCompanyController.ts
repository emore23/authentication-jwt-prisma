import { Request, Response } from "express";
import { CompanyModel } from "../models/createCompany.model";
import { CreateCompanyRepository } from "../repositories/createCompanyRepository";

export class CreateCompanyController {
  async createCompany(req: Request, res: Response) {
    const { slug, name, payment_options, address, picture }: CompanyModel =
      req.body;

    const createCompanyRepo = new CreateCompanyRepository();

    try {
      const newCompany = await createCompanyRepo.createCompany({
        slug,
        name,
        payment_options,
        address,
        picture,
      });

      return res.status(201).json(newCompany);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getCompany(req: any, res: Response) {
    console.log(res);
    return res.json(req.company);
  }
}
