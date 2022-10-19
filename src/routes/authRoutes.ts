import { Router } from "express";
import { authControllers } from "../controller/controller";

export const authRoutes = Router();

authRoutes.post("/login", authControllers.loginController);
authRoutes.post("/logout", authControllers.logoutController);
