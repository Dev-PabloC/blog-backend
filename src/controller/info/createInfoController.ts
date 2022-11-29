import { prisma } from "../../database/prismaconnection";
import { context } from "../../utils/context";
import { getDataTokenPromise } from "../../utils/decodedPromise";

export const createInfo = async ({ req, res }: context) => {
	try {
		const props = req.body;

		const { token } = req.cookies;

		const { email } = (await getDataTokenPromise(String(token))) as { email: string };
		if (email) {
			await prisma.user
				.update({ where: { email: email }, data: { info: { create: { ...props } } } })
				.then(() => {
					return res.status(201).send({ message: "Info created" });
				})
				.catch((err) => {
					return res.status(500).send({ error: err });
				});
		}

		return res.status(401).send({ message: "acess denied" });
	} catch (err) {
		return res.status(500).send({ error: err });
	}
};
