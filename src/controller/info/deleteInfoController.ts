import { verify } from "jsonwebtoken";
import { prisma } from "../../database/prismaconnection";
import { Request, Response } from "express";

export const deleteInfo = async (req: Request, res: Response) => {
	try {
		const { _id } = req.params;

		const authToken = req.headers["authorization"];
		const token = authToken?.slice(7);

		verify(String(token), String(process.env.JWTKEY), async (err, decoded) => {
			if (err) {
				return res.status(500).send({ error: err });
			}

			const { userId } = decoded as { userId: string };

			const result = await prisma.info.findFirst({ where: { userId: userId } });

			if (result?.id === _id) {
				await prisma.info
					.delete({ where: { id: _id } })
					.then(() => {
						return res.status(204).send({ message: "sinfo deleted" });
					})
					.catch((err) => {
						return res.status(500).send({ message: err });
					});
			}
		});
	} catch (err) {
		return res.status(500).send({ error: err });
	}
};
