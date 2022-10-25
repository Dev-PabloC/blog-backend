import { prisma } from "../../database/prismaconnection";
import { Request, Response } from "express";

export const deleteInfo = async (req: Request, res: Response) => {
	try {
		const { _id } = req.params;

		await prisma.info
			.delete({ where: { id: _id } })
			.then(() => {
				res.status(204).send({ message: "info deleted" });
			})
			.catch((err) => {
				res.status(500).send({ message: err });
			});
	} catch (err) {
		res.status(500).send({ error: err });
	}
};
