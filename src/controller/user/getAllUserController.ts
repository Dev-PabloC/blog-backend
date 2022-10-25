import { prisma } from "../../database/prismaconnection";
import { Request, Response } from "express";

export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const result = await prisma.user.findMany({});

		if (result) {
			res.status(200).json(result);
		}

		res.status(500).send({ message: "Server error" });
	} catch (err) {
		res.status(500).send({ error: err });
	}
};
