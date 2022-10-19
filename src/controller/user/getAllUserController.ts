import { prisma } from "../../database/prismaconnection";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const result = await prisma.user.findMany({
			select: {
				id: true,
				email: true,
				username: true,
				posts: true,
				info: true,
			},
		});

		if (result) {
			res.status(200);
			res.json(result);
		}

		res.status(500);
		res.send({ error: "No data found" });
	} catch (err) {
		res.status(500);
		res.send({ error: err });
	}
};
