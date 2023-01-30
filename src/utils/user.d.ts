export type ICreateUserData = {
	username: string;
	email: string;
	password: string;
}

export type IUpdateUserData = {
	username?: string;
	email?: string;
	password?: string;
}
