import { Router } from "express";
import { middlewares } from "../middleware/middlewares";
import { adminControllers } from "../controller/controller";

export const adminRoutes = Router();

adminRoutes.delete(
	"/user/:name",
	middlewares.adminRoleMiddleware,
	middlewares.authTokenMiddleware,
	adminControllers.deleteUserByAdmin,
);
adminRoutes.delete(
	"/post/:_id",
	middlewares.adminRoleMiddleware,
	middlewares.authTokenMiddleware,
	adminControllers.deletePostByAdmin,
);
