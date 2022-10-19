import { prisma } from "../../database/prismaconnection";
import { genSalt, hash } from "bcrypt";
import { Request, Response } from "express";

export const postUserController = async (req: Request, res: Response) => {
	try {
		let { username, email, password } = req.body;

		const salt = await genSalt(20);

		const hashPassword = await hash(password, salt);

		const UserData = {
			username: username,
			email: email,
			password: hashPassword,
		};

		await prisma.user.create({
			data: UserData,
		});

		res.status(201);
		res.send();
		res.redirect("/login");
	} catch (err) {
		res.status(500);
		res.send({ error: err });
	}
};
