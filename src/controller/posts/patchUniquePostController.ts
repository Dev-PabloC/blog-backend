import { prisma } from "../../database/prismaconnection";
import { Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const patchUniquePost = async (req: Request, res: Response) => {
	try {
		const { _id } = req.params;
		const props = req.body;

		const authToken = req.headers["authorization"];
		const token = authToken?.slice(7);

		verify(String(token), String(process.env.JWTKEY), async (err, decoded) => {
			if (err) {
				return res.status(500).send({ error: err });
			}
			const { userId } = decoded as { userId: string };
			const result = await prisma.post.findFirst({
				where: {
					userId: userId,
				},
			});

			if (result?.id === _id) {
				await prisma.post
					.update({
						where: { id: _id },
						data: { ...props },
					})
					.then(() => {
						return res.status(204).send({ message: "post updated" });
					})
					.catch(() => {
						return res.status(500).send({ error: err });
					});
			}
		});
	} catch (err) {
		return res.status(500).send({ error: err });
	}
};
