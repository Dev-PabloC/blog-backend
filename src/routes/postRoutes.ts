import { Router } from "express";
import { postControllers } from "../controller/controller";
import { middlewares } from "../middleware/middlewares";

export const postRoutes = Router();

postRoutes.get("/", middlewares.authTokenMiddleware, postControllers.getAllPostUser);
postRoutes.get("/:_id", middlewares.authTokenMiddleware, postControllers.getUniquePost);
postRoutes.post("/", middlewares.authTokenMiddleware, postControllers.postCreate);
postRoutes.patch("/:_id", middlewares.authTokenMiddleware, postControllers.patchUniquePost);
postRoutes.delete("/:_id", middlewares.authTokenMiddleware, postControllers.deleteUniquePost);
