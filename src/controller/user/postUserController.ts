import { prisma } from "../../database/prismaconnection";

import { Request, Response } from "express";

export const postUser = async (req: Request, res: Response) => {
	try {
		let { username, email, password } = req.body;

		const UserData = {
			username: username,
			email: email,
			password: password,
		};

		await prisma.user.create({
			data: UserData,
		});

		res.status(201).send("User created");
	} catch (err) {
		res.status(500).send({ error: err });
	}
};
