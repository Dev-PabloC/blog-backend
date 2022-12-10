import { Router } from "express";
import { authControllers } from "../controller/controller";
import { middlewares } from "../middleware/middlewares";

export const authRoutes = Router();

authRoutes.post("/login", authControllers.loginController);
authRoutes.post("/register", authControllers.registerController)
