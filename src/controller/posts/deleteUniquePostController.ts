import { prisma } from "../../database/prismaconnection";
import { Request, Response } from "express"
import { getDataTokenPromise } from "../../utils/decodedPromise";

export const deleteUniquePost = async (req: Request, res: Response) => {
	try {
		const { _id } = req.params;

		const { token } = req.cookies;

		const { userId } = (await getDataTokenPromise(String(token))) as { userId: string };

		const result = await prisma.post.findFirst({ where: { userId: userId } });

		if (result?.id === _id) {
			prisma.post
				.delete({ where: { id: _id } })
				.then(() => {
					return res.status(200).send({ message: "Post deleted" });
				})
				.catch((err) => {
					return res.status(400).send({ error: err });
				});
		}

		return res.status(401).send({ message: "acess denied" });
	} catch (err) {
		return res.status(500).send({ error: err });
	}
};
