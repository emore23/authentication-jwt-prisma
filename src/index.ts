import "express-async-errors";
import express from "express";
import { errorMiddleware } from "./middlewares/error";
import routes from "./routes";

const app = express();
app.use(express.json());

app.use(routes);
app.use(errorMiddleware);

app.listen(3333, () => console.log("Server is running in port 3333!"));
