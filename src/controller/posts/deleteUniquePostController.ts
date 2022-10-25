import { prisma } from "../../database/prismaconnection";
import { Request, Response } from "express";

export const deleteUniquePost = async (req: Request, res: Response) => {
	try {
		const { _id } = req.params;

		await prisma.post
			.delete({ where: { id: _id } })
			.then(() => {
				res.status(204).send({ message: "Post deleted" });
			})
			.catch((err) => {
				res.status(500).send({ error: err });
			});
	} catch (err) {
		res.status(500).send({ error: err });
	}
};
