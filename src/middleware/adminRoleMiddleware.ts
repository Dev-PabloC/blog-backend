import { Request, Response, NextFunction } from "express";
import { prisma } from "../database/prismaconnection";
import { getDataTokenPromise } from "../utils/decodedPromise";

export const adminRoleMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { token } = req.cookies;
		if (!token) {
			return res.status(400).send("no token");
		}
		const { email } = (await getDataTokenPromise(String(token))) as { email: string };
		const result = await prisma.user.findFirst({ where: { email: email } });

		if (result?.admin !== true) {
			return res.status(401).send({ message: "No admin role, acess denied" });
		}
		next();
	} catch (err) {
		return res.status(500).send({ error: err });
	}
};
