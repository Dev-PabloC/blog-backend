import { prisma } from "../../database/prismaconnection";
import { context } from "../../utils/context";
import { ICreateUserData } from "../../utils/user";

export const postUser = async ({ req, res }: context) => {
	try {
		let { username, email, password }: ICreateUserData = req.body;

		if (!username || !email || !password) {
			return res.status(400).send({ message: "Send a data correct" });
		}

		const UserData = {
			username: username,
			email: email,
			password: password,
		};

		await prisma.user
			.create({
				data: UserData,
			})
			.then(() => {
				return res.status(201).send("User created");
			})
			.catch((err) => {
				if (err.message.includes("Unique constraint failed on the constraint: `users_username_key`")) {
					return res.status(400).send({ message: "username already exist" });
				} else if (err.message.includes("Unique constraint failed on the constraint: `users_email_key`")) {
					return res.status(400).send({ message: "email already exist" });
				} else {
					return res.status(500).send(err.message);
				}
			});
	} catch (err) {
		return res.status(500).send({ error: err });
	}
};
