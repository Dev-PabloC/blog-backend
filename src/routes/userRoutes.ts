import { userControllers } from "../controller/controller";
import { Router } from "express";
import { middlewares } from "../middleware/middlewares";

export const userRoutes = Router();

userRoutes.patch("/:name", middlewares.authTokenMiddleware, userControllers.patchUniqueUser);
userRoutes.get("/", middlewares.authTokenMiddleware, userControllers.getAllUsers);
userRoutes.get("/:name", middlewares.authTokenMiddleware, userControllers.getUniqueUser);
userRoutes.get("/search", middlewares.authTokenMiddleware, userControllers.getAllUsersByLetter);
userRoutes.delete("/:name", middlewares.authTokenMiddleware, userControllers.deleteUniqueUser);
