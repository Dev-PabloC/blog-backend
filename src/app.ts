import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import CookieParser from "cookie-parser";
import { routes } from "./routes";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(CookieParser());
app.use("/api", routes);
