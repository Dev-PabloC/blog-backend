import jwt from "jsonwebtoken";
import { prisma } from "../../database/prismaconnection";
import { Request, Response } from "express";

export const postCreate = async (req: Request, res: Response) => {
	try {
		const { title, content } = req.body;
		const authToken = req.headers["authorization"];
		const token = authToken?.slice(7);

		if (!title) {
			return res.status(403).send({ message: "Send a title" });
		}
		if (!content) {
			return res.status(403).send({ message: "Send a content" });
		}

		jwt.verify(String(token), String(process.env.JWTKEY), async (err, decoded) => {
			if (err) {
				return res.status(500).send({ error: err });
			}
			const { userId, email } = decoded as { userId: string; email: string };
			await prisma.user
				.update({
					where: { email: email },
					data: { posts: { create: { title: title, content: content } } },
				})
				.then(() => {
					return res.status(201).send({ message: "post created" });
				})
				.catch((err) => {
					return res.status(500).send({ message: `error: ${err}` });
				});
		});
	} catch (err) {
		return res.status(500).send({ error: err });
	}
};
