import jwt from "jsonwebtoken";
import { prisma } from "../../database/prismaconnection";
import { Request, Response } from "express";

export const postCreate = async (req: Request, res: Response) => {
	try {
		const { title, content } = req.body;
		const token = window.sessionStorage.getItem("token");

		const { userId, email }: any = jwt.verify(String(token), String(process.env.JWTKEY));

		await prisma.user.update({
			where: { email: email },
			data: { posts: { create: { title: title, content: content } } },
		});
		res.status(201).send({ message: "post created" });
	} catch (err) {
		res.status(500).send({ error: err });
	}
};
