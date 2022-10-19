import { hash, genSalt } from "bcrypt";
import { prisma } from "../../database/prismaconnection";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const patchUser = async (req: Request, res: Response) => {
	try {
		const { name } = req.params;
		const props = req.body;
		const authToken = req.headers.authorization;
		const [, token]: any = authToken?.split(" ");

		const { username }: any = jwt.verify(token, String(process.env.JWTKEY));

		if (!props) {
			res.status(500);
			res.send("No request body");
		}

		if (props.password) {
			const { password, ...other } = props;
			const salt = await genSalt(20);
			const hashpassword = await hash(password, salt);

			await prisma.user.update({
				where: { username: username },
				data: {
					password: hashpassword,
					...other,
				},
			});
			res.status(204);
			res.send("Atualizado");
		}

		await prisma.user.update({
			where: { username: name },
			data: { ...props },
		});

		res.status(204);
		res.send("Atualizado");
	} catch (err) {
		res.status(500);
		res.send({ error: err });
	}
};
