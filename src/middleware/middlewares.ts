import { adminRoleMiddleware } from './adminRoleMiddleware';
import { authTokenMiddleware } from "./authTokenMiddleware";

export const middlewares = {
	authTokenMiddleware,
	adminRoleMiddleware
};
