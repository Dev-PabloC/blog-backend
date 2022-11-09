import { prisma } from "../../database/prismaconnection";

import { Request, Response } from "express";

export const postUser = async (req: Request, res: Response) => {
	try {
		let { username, email, password } = req.body;

<<<<<<< HEAD
		if (!username || !email || !password) {
			return res.status(400).send({ message: "Send a data correct" });
=======
		if (!username) {
			return res.status(400).send({ message: "Send a username" });
		}
		if (!email) {
			return res.status(400).send({ message: "Send a email" });
		}

		if (!password) {
			return res.status(400).send({ message: "Send a password" });
>>>>>>> a071d477a6051256d088d8601363af058fbba178
		}

		const UserData = {
			username: username,
			email: email,
			password: password,
		};

		await prisma.user.create({
			data: UserData,
		});

		return res.status(201).send("User created");
	} catch (err) {
		return res.status(500).send({ error: err });
	}
};
