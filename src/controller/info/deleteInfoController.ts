import { prisma } from "../../database/prismaconnection";
import { context } from "../../utils/context";
import { getDataTokenPromise } from "../../utils/decodedPromise";

export const deleteInfo = async ({ req, res }: context) => {
	try {
		const { _id } = req.params;

		const { token } = req.cookies;

		const { userId } = (await getDataTokenPromise(String(token))) as { userId: string };

		const result = await prisma.info.findFirst({ where: { userId: userId } });

		if (result?.id === _id) {
			await prisma.info
				.delete({ where: { id: _id } })
				.then(() => {
					return res.status(200).send({ message: "info deleted" });
				})
				.catch((err) => {
					return res.status(500).send({ message: err });
				});
		}

		return res.status(401).send({ message: "acess denied" });
	} catch (err) {
		return res.status(500).send({ error: err });
	}
};
