import jwt from "jsonwebtoken";
import { prisma } from "../../database/prismaconnection";
import { Request, Response } from "express";

export const deleteUniqueUser = async (req: Request, res: Response) => {
	try {
		const { name } = req.params;

		const result = await prisma.user.delete({ where: { username: name } });

		if (result) {
			res.status(204);
			res.send("User deleted");
		}
		res.status(500);
		res.send({ error: "Error" });
	} catch (err) {
		res.status(500);
		res.send({ error: err });
	}
};
