//userControllers
import { postUser } from "./user/postUserController";
import { patchUniqueUser } from "./user/patchUniqueUserController";
import { getUniqueUser } from "./user/getUniqueUserController";
import { getAllUsers, getAllUsersByLetter } from "./user/getAllUserController";
import { deleteUniqueUser } from "./user/deleteUniqueUserController";

//postControllers
import { postCreate } from "./posts/postCreateController";
import { patchUniquePost } from "./posts/patchUniquePostController";
import { getUniquePost } from "./posts/getUniquePostController";
import { getAllPostUser } from "./posts/getAllPostsController";
import { deleteUniquePost } from "./posts/deleteUniquePostController";

//infoControllers
import { createInfo } from "./info/createInfoController";
import { patchInfo } from "./info/patchInfoController";
import { deleteInfo } from "./info/deleteInfoController";

//authControllers
import { loginController } from "./auth/postLoginController";

//adminControllers
import { deleteUserByAdmin } from "./admin/deleteAdminUserController";
import { deletePostByAdmin } from "./admin/deleteAdminPostController";

export const userControllers = {
	postUser,
	patchUniqueUser,
	getUniqueUser,
	getAllUsers,
	getAllUsersByLetter,
	deleteUniqueUser,
};

export const postControllers = {
	postCreate,
	patchUniquePost,
	getAllPostUser,
	getUniquePost,
	deleteUniquePost,
};

export const infoControllers = {
	createInfo,
	patchInfo,
	deleteInfo,
};

export const authControllers = {
	loginController,
};

export const adminControllers = {
	deleteUserByAdmin,
	deletePostByAdmin,
};
