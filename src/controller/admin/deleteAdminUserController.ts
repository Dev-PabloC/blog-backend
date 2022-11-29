import { context } from "../../utils/context";
import { prisma } from "../../database/prismaconnection";

export const deleteUserByAdmin = async ({ req, res }: context) => {
	try {
		const { name } = req.params;

		await prisma.user
			.delete({
				where: {
					username: name,
				},
			})
			.then(() => {
				return res.send({ message: "User deleted" });
			})
			.catch((err) => {
				return res.status(500).send({ error: err });
			});
	} catch (err) {
		return res.status(500).send({ error: err });
	}
};
