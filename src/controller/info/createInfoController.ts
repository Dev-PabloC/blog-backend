import { prisma } from "../../database/prismaconnection";
import { Request, Response } from "express"
import { getDataTokenPromise } from "../../utils/decodedPromise";

export const createInfo = async (req: Request, res: Response) => {
	try {
		const props = req.body;

		const { token } = req.cookies;

		const { email } = (await getDataTokenPromise(String(token))) as { email: string };
		if (email) {
			prisma.user
				.update({ where: { email: email }, data: { info: { create: { ...props } } } })
				.then(() => {
					return res.status(201).send({ message: "Info created" });
				})
				.catch((err) => {
					return res.status(500).send({ error: err });
				});
		}

		return res.status(401).send({ message: "acess denied" });
	} catch (err) {
		return res.status(500).send({ error: err });
	}
};
