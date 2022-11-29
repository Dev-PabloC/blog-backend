import { context } from "../../utils/context";
import { IUpdateUserData } from "../../utils/user";
import { prisma } from "../../database/prismaconnection";
import { getDataTokenPromise } from "../../utils/decodedPromise";

export const patchUniqueUser = async ({ req, res }: context) => {
	try {
		const props: IUpdateUserData = req.body;
		const { name } = req.params;
		const authToken = req.headers["authorization"];
		const token = authToken?.slice(7);

		const { username } = (await getDataTokenPromise(String(token))) as { username: string };
		if (username === name) {
			await prisma.user.update({
				where: { username: name },
				data: {
					...props,
				},
			});
			return res.status(200).send({ message: "User updated" });
		}

		return res.status(401).send({ message: "acess denied" });
	} catch (err) {
		console.log(err);
		return res.status(500).send({ error: err });
	}
};
