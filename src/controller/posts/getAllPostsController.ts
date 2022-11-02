import { prisma } from "../../database/prismaconnection";
import { Request, Response } from "express";

export const getAllPostUser = async (req: Request, res: Response) => {
	try {
		const { _id } = req.params;
		const result = await prisma.post.findMany({ where: { userId: _id } });
		if (result) {
			return res.status(200).json(result);
		}

		return res.status(500).send({ message: "posts not found" });
	} catch (err) {
		return res.status(500).send({ error: err });
	}
};
