import { prisma } from "../../database/prismaconnection";
import { Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const deleteUniqueUser = async (req: Request, res: Response) => {
	try {
		const { name } = req.params;
		const authToken = req.headers["authorization"];
		const token = authToken?.slice(7);

		verify(String(token), String(process.env.JWTKEY), async (err, decoded) => {
			if (err) {
				return res.status(500).send({ error: err });
			}

			const { username }: any = decoded;

			if (username === name) {
				await prisma.user
					.delete({ where: { username: name } })
					.then(() => {
						return res.status(204).send({ message: "User deleted" });
					})
					.catch((err) => {
						return res.status(500).send({ message: "Esse user já foi deletado" });
					});
			} else {
				return res.status(401).send({ message: "Acess denied" });
			}
		});
	} catch (err) {
		return res.status(500).send({ error: err });
	}
};
