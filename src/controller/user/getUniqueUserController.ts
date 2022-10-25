import { Request, Response } from "express";
import { prisma } from "../../database/prismaconnection";

export const getUniqueUser = async (req: Request, res: Response) => {
	try {
		const { name } = req.params;

		const result = await prisma.user.findUnique({
			where: { username: name },
		});
		if (result) {
			res.status(200).json(result);
		}

		res.status(500).send({ message: "user not found" });
	} catch (err) {
		res.status(500).send({ error: err });
	}
};
