import { prisma } from "../../database/prismaconnection";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const createInfo = async (req: Request, res: Response) => {
	try {
		const props = req.body;
		const token = window.sessionStorage.getItem("token");
		const { userId, email }: any = jwt.verify(String(token), String(process.env.JWTKEY));

		await prisma.user.update({ where: { email: email }, data: { info: { create: { ...props } } } });
		res.status(201).send({ message: "Info created" });
	} catch (err) {
		res.status(500).send({ error: err });
	}
};
