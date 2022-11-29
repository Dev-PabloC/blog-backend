import { context } from "../../utils/context";
import { prisma } from "../../database/prismaconnection";

export const getUniqueUser = async ({ req, res }: context) => {
	try {
		const { name } = req.params;

		const result = await prisma.user.findUnique({
			where: { username: name },
			select: {
				id: true,
				email: true,
				username: true,
				info: true,
				posts: true,
			},
		});
		if (result) {
			return res.status(200).json(result);
		}

		return res.send({ message: "user not found" });
	} catch (err) {
		return res.status(500).send({ error: err });
	}
};
