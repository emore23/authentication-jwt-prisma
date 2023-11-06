import { Router } from "express";

import { CreateUserController } from "./controllers/CreateUserController";
import { LoginController } from "./controllers/LoginController";
import { authMiddleware } from "./middlewares/authMiddleware";
import { CreateCompanyController } from "./controllers/CreateCompanyController";

const routes = Router();

routes.post("/user", new CreateUserController().createUser);
routes.post("/login", new LoginController().loginUser);
routes.post("/company", new CreateCompanyController().createCompany);

routes.use(authMiddleware);

routes.get("/company", new CreateCompanyController().getCompany);
routes.get("/profile", new LoginController().getProfile);

export default routes;
