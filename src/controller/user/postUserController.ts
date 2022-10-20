import { prisma } from "../../database/prismaconnection";
import { genSalt, hash } from "bcrypt";
import { Request, Response } from "express";

export const postUser = async (req: Request, res: Response) => {
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

		res.sendStatus(201);
		
	} catch (err) {
		res.sendStatus(500);
	}
};
