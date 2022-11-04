import { verify } from "jsonwebtoken";
import { prisma } from "../../database/prismaconnection";
import { Request, Response } from "express";
import { getDataTokenPromise } from "../../utils/decodedPromise";

export const patchInfo = async (req: Request, res: Response) => {
	try {
		const { _id } = req.params;
		const props = req.body;

		const authToken = req.headers["authorization"];
		const token = authToken?.slice(7);

		const { userId } = (await getDataTokenPromise(String(token))) as { userId: string };

		const result = await prisma.info.findFirst({ where: { userId: userId } });

		if (result?.id === _id) {
			await prisma.info
				.update({ where: { id: _id }, data: { ...props } })
				.then(() => {
					return res.status(204).send({ message: "info updated" });
				})
				.catch((err) => {
					return res.status(500).send({ error: err });
				});
		}
	} catch (err) {
		return res.status(500).send({ error: err });
	}
};
