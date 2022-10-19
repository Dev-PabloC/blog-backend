//userControllers
import { postUser } from "./user/postUserController";
import { patchUser } from "./user/patchUniqueUserController";
import { getUniqueUser } from "./user/getUniqueUserController";
import { getAllUsers } from "./user/getAllUserController";
import { deleteUniqueUser } from "./user/deleteUniqueUserController";

//authControllers
import { loginController } from "./auth/postLoginController";
import { logoutController } from "./auth/postLogoutController";

export const userControllers = {
	postUser,
	patchUser,
	getUniqueUser,
	getAllUsers,
	deleteUniqueUser,
};

export const authControllers = {
	loginController,
	logoutController,
};
