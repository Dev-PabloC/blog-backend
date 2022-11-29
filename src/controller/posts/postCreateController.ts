import { prisma } from "../../database/prismaconnection";
import { Request, Response } from "express";
import { getDataTokenPromise } from "../../utils/decodedPromise";

export const postCreate = async (req: Request, res: Response) => {
	try {
		const { title, content } = req.body;
		const { token } = req.cookies;

		if (!title) {
			return res.status(400).send({ message: "Send a title" });
		}
		if (!content) {
			return res.status(400).send({ message: "Send a content" });
		}

		const { email } = (await getDataTokenPromise(String(token))) as { email: string };

		await prisma.user
			.update({
				where: { email: email },
				data: {
					posts: {
						create: { title: title, content: content },
					},
				},
			})
			.then(() => {
				return res.status(201).send({ message: "post created" });
			})
			.catch((err) => {
				return res.status(500).send({ message: `error: ${err}` });
			});
	} catch (err) {
		return res.status(500).send({ error: err });
	}
};
