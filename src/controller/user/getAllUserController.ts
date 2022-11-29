import { prisma } from "../../database/prismaconnection";
import { Request, Response } from "express";

export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const result = await prisma.user.findMany({
			select: {
				id: true,
				username: true,
				email: true,
				info: true,
				posts: true,
			},
		});

		if (result) {
			return res.status(200).json(result);
		}

		return res.status(500).send({ message: "Server error" });
	} catch (err) {
		console.log(err);
		return res.status(500).send({ error: err });
	}
};
