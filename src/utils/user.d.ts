export interface ICreateUserData {
	username: string;
	email: string;
	password: string;
}

export interface IUpdateUserData {
	username?: string;
	email?: string;
	password?: string;
}
