import { Request, Response } from "express"
import { prisma } from "../../database/prismaconnection";

export const deleteUserByAdmin = async (req:Request,res:Response) => {
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
