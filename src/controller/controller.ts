//userControllers
import { postUserController } from "./user/postUserController";
import { patchUserController } from "./user/patchUniqueUserController";

//authControllers
import { loginController } from "./auth/postLoginController";
import { logoutController } from "./auth/postLogoutController";

export const userControllers = {
	postUserController,
	patchUserController,
};

export const authControllers = {
	loginController,
	logoutController,
};
