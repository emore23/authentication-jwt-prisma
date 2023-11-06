import { Company, User } from "@prisma/client";
import { prisma } from "../prisma/client";
import { CompanyModel } from "../models/createCompany.model";
import { BadRequestError } from "../helpers/api-errors";

export class CreateCompanyRepository {
  async createCompany(companyData: CompanyModel): Promise<Company> {
    const companyAlreadyExists = await prisma.company.findUnique({
      where: {
        slug: companyData.slug,
      },
    });

    if (companyAlreadyExists) {
      throw new BadRequestError("A empresa já existe");
    }

    // Crie a empresa associando-a ao usuário criador
    const newCompany = await prisma.company.create({
      data: {
        ...companyData,
      },
    });

    return newCompany;
  }
}
