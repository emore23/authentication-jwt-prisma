import { Router } from "express";

import { CreateUserController } from "./controllers/CreateUserController";
import { LoginController } from "./controllers/LoginController";
import { authMiddleware } from "./middlewares/authMiddleware";

const routes = Router();

routes.post("/user", new CreateUserController().createUser);
routes.post("/login", new LoginController().loginUser);

routes.use(authMiddleware);

routes.get("/profile", new LoginController().getProfile);

export default routes;
