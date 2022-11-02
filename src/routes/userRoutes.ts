import { userControllers } from "../controller/controller";
import { Router } from "express";
import { middlewares } from "../middleware/middlewares";

export const userRoutes = Router();

userRoutes.post("/", userControllers.postUser);
userRoutes.patch("/:name", middlewares.authTokenMiddleware, userControllers.patchUniqueUser);
userRoutes.get("/", middlewares.authTokenMiddleware, userControllers.getAllUsers);
userRoutes.get("/:name", middlewares.authTokenMiddleware, userControllers.getUniqueUser);
userRoutes.delete("/:name", middlewares.authTokenMiddleware, userControllers.deleteUniqueUser);
