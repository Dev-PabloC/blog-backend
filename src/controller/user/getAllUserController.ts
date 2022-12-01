import { prisma } from "../../database/prismaconnection";
import { Request, Response } from "express"

export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const result = await prisma.user.findMany({
			select: {
				id: true,
				username: true,
				email: true,
				info: true,
				posts: true,
				password: true
			},
		});

		if (result) {
			return res.status(200).json(result);
		}

		return res.status(500).send({ message: "Server error" });
	} catch (err) {
		console.log(err);
		return res.status(500).send({ error: err });
	}
};

export const getAllUsersByLetter = async (req: Request, res: Response) => {
	try {
		const { search } = req.body as { search: string };
		const result = await prisma.user.findMany({
			where: {
				OR: {
					username: {
						contains: search,
					},
				},
			},
		});

		if (result) {
			return res.status(200).json(result);
		}

		return res.status(500).send({ message: "user not found" });
	} catch (err) {
		return res.status(500).send({ error: err });
	}
};
