import { userControllers } from "../controller/controller";
import { Router } from "express";
import { middlewares } from "../middleware/middlewares";

export const userRoutes = Router();

userRoutes.post("/", userControllers.postUserController);
userRoutes.patch("/:name", middlewares.authTokenMiddleware, userControllers.patchUserController);
