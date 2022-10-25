import { prisma } from "../../database/prismaconnection";
import { Request, Response } from "express";

export const patchUniquePost = async (req: Request, res: Response) => {
	try {
		const { _id } = req.params;
		const props = req.body;

		await prisma.post.update({
			where: { id: _id },
			data: { ...props },
		});
		res.status(204).send({ message: "post updated" });
	} catch (err) {
		res.status(500).send({ error: err });
	}
};
