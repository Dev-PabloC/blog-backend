import { Request, Response } from "express";
import { prisma } from "../../database/prismaconnection";

export const patchUniqueUser = async (req: Request, res: Response) => {
	try {
		const props = req.body;
		const { name } = req.params;
		await prisma.user.update({
			where: { username: name },
			data: {
				...props,
			},
		});
		res.status(204).send({ message: "User updated" });
	} catch (err) {
		res.status(500).send({ error: err });
	}
};
