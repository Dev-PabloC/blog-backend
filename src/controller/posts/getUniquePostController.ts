import { prisma } from "../../database/prismaconnection";
import { Request, Response } from "express";

export const getUniquePost = async (req: Request, res: Response) => {
	try {
		const { _id } = req.params;

		const result = await prisma.post.findUnique({ where: { id: _id } });
		if (result) {
			res.status(200).json(result);
		}

		res.status(500).send({ message: "post not found" });
	} catch (err) {
		res.status(500).send({ error: err });
	}
};
