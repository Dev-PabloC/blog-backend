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
			res.json(result);
			res.sendStatus(200);
		}

		throw new Error("Data not found");
	} catch (err) {
		res.sendStatus(500);
		throw new Error("Server error");
	}
};
