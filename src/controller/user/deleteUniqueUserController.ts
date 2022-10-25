import { prisma } from "../../database/prismaconnection";
import { Request, Response } from "express";

export const deleteUniqueUser = async (req: Request, res: Response) => {
	try {
		const { name } = req.params;

		await prisma.user
			.delete({ where: { username: name } })
			.then(() => {
				res.status(204).send({ message: "User deleted" });
			})
			.catch((err) => {
				res.status(500).send({ message: err });
			});
	} catch (err) {
		res.status(500).send({ error: err });
	}
};
