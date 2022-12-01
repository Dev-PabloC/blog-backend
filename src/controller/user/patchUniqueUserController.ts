import { Request, Response } from "express"
import { IUpdateUserData } from "../../utils/user";
import { prisma } from "../../database/prismaconnection";
import { getDataTokenPromise } from "../../utils/decodedPromise";

export const patchUniqueUser = async (req: Request, res: Response) => {
	try {
		const props: IUpdateUserData = req.body;
		const { name } = req.params;
		const { token } = req.cookies

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
