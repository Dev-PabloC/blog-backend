import { prisma } from "../../database/prismaconnection";
import { context } from "../../utils/context";

export const getAllPostUser = async ({ req, res }: context) => {
	try {
		const { _id } = req.params;
		const result = await prisma.post.findMany({ where: { userId: _id } });
		if (result) {
			return res.status(200).json(result);
		}

		return res.status(500).send({ message: "posts not found" });
	} catch (err) {
		return res.status(500).send({ error: err });
	}
};
