import { prisma } from "../../database/prismaconnection";
import { Request, Response } from "express";

export const getAllPostUser = async (req: Request, res: Response) => {
	try {
		const { _id } = req.params;
		const result = await prisma.post.findMany({ where: { userId: _id } });
		if (result) {
			res.status(200).json(result);
		}

		res.status(500).send({ message: "posts not found" });
	} catch (err) {
		res.status(500).send({ error: err });
	}
};
