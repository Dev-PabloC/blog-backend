import { prisma } from "../../database/prismaconnection";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const getUniqueUser = async (req: Request, res: Response) => {
	try {
		const { name } = req.params;

		const result = await prisma.user.findUnique({
			where: { username: name },
			select: {
				id: true,
				username: true,
				email: true,
				posts: true,
				info: true,
			},
		});

		res.status(200);
		res.json(result);
	} catch (err) {
		res.status(500);
		res.send({ error: err });
	}
};
