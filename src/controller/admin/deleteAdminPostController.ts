import { context } from "../../utils/context";
import { prisma } from "../../database/prismaconnection";

export const deletePostByAdmin = async ({ req, res }: context) => {
	try {
		const { _id } = req.params;

		await prisma.post
			.delete({
				where: {
					id: _id,
				},
			})
			.then(() => {
				return res.status(200).send({ message: "Post deleted" });
			})
			.catch((err) => {
				return res.status(500).send({ error: err });
			});
	} catch (err) {
		return res.status(500).send({ error: err });
	}
};
