import { prisma } from "../../database/prismaconnection";
import { Request, Response } from "express";

export const patchInfo = async (req: Request, res: Response) => {
	try {
		const { _id } = req.params;
		const props = req.body;

		await prisma.info.update({ where: { id: _id }, data: { ...props } });
		res.status(204).send({ message: "info updated" });
	} catch (err) {
		res.status(500).send({ error: err });
	}
};
