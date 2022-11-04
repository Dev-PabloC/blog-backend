import { prisma } from "../../database/prismaconnection";
import { Request, Response } from "express";
import { getDataTokenPromise } from "../../utils/decodedPromise";

export const deleteUniqueUser = async (req: Request, res: Response) => {
	try {
		const { name } = req.params;
		const authToken = req.headers["authorization"];
		const token = authToken?.slice(7);

		const { username } = (await getDataTokenPromise(String(token))) as { username: string };

		if (username === name) {
			await prisma.user
				.delete({ where: { username: name } })
				.then(() => {
					return res.status(204).send({ message: "User deleted" });
				})
				.catch((err) => {
					return res.status(500).send({ message: "Esse user já foi deletado" });
				});
		} else {
			return res.status(401).send({ message: "Acess denied" });
		}
	} catch (err) {
		return res.status(500).send({ error: err });
	}
};
