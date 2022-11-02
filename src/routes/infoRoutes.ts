import { Router } from "express";
import { infoControllers } from "../controller/controller";
import { middlewares } from "../middleware/middlewares";

export const infoRoutes = Router();

infoRoutes.post("/", middlewares.authTokenMiddleware, infoControllers.createInfo);
infoRoutes.patch("/:_id", middlewares.authTokenMiddleware, infoControllers.patchInfo);
infoRoutes.delete("/:_id", middlewares.authTokenMiddleware, infoControllers.deleteInfo);
