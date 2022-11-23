import { Router } from "express";
import { adminRoutes } from "./adminRoute";
import { authRoutes } from "./authRoutes";
import { infoRoutes } from "./infoRoutes";
import { postRoutes } from "./postRoutes";
import { userRoutes } from "./userRoutes";

export const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);
routes.use("/posts", postRoutes);
routes.use("/info", infoRoutes);
routes.use("/admin", adminRoutes);
