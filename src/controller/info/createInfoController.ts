import { prisma } from "../../database/prismaconnection";
import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getDataTokenPromise } from "../../utils/decodedPromise";

export const createInfo = async (req: Request, res: Response) => {
	try {
		const props = req.body;
		const authToken = req.headers["authorization"];
		const token = authToken?.slice(7);

		const { email } = (await getDataTokenPromise(String(token))) as { email: string };

		await prisma.user
			.update({ where: { email: email }, data: { info: { create: { ...props } } } })
			.then(() => {
				return res.status(201).send({ message: "Info created" });
			})
			.catch((err) => {
				return res.status(500).send({ error: err });
			});
	} catch (err) {
		return res.status(500).send({ error: err });
	}
};
