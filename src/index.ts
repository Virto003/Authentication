import express, { NextFunction, Request, Response } from "express";
import statusRoute from "./routes/status.route";
import usersRoute from "./routes/users.route";
import errorHandler from "./middlewares/error-handler.midleware";
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(usersRoute);
app.use(statusRoute);

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Aplicação executando na porta 3000')
});