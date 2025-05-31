import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errors } from "celebrate";

import { DB_ADDRESS } from "./config";
import routes from "./routes";
import { createUser, login } from "./controllers/users";
import NotFoundError from "./errors/not-found-error";
import auth from "./middlewares/auth";
import errorHandler from "./middlewares/error-handler";

import {
  validateUserBody,
  validateAuthentication,
} from "./middlewares/validatons";

import dotenv from "dotenv";
dotenv.config();

const { PORT = 3000 } = process.env;
const app = express();

const allowedOrigins = ["https://domainname.students2510.nomorepartiessbs.ru"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.options("*", cors());

mongoose.connect(DB_ADDRESS);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.post("/signin", validateUserBody, login);
app.post("/signup", validateAuthentication, createUser);

app.use(auth);
app.use(routes);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError("Маршрут не найден"));
});

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
