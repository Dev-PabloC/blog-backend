import { Request, Response } from "express";
import { prisma } from "../../database/prismaconnection";
import { verify } from "jsonwebtoken";

export const patchUniqueUser = async (req: Request, res: Response) => {
	try {
		const props = req.body;
		const { name } = req.params;
		const authToken = req.headers["authorization"];
		const token = authToken?.slice(7);

		verify(String(token), String(process.env.JWTKEY), async (err, decoded) => {
			if (err) {
				return res.status(500).send({ message: err });
			}

			const { username }: any = decoded;

			if (username === name) {
				await prisma.user.update({
					where: { username: name },
					data: {
						...props,
					},
				});

				return res.status(204).send({ message: "User updated" });
			}

			return res.status(401).send({ message: "acess denied" });
		});
	} catch (err) {
		return res.status(500).send({ error: err });
	}
};
