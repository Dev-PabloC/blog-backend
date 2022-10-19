import { Request, Response } from "express";
import { prisma } from "../../database/prismaconnection";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginController = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const FetchData = await prisma.user.findUnique({ where: { email: email } });
		const result = await bcrypt.compare(password, String(FetchData?.password));

		if (!FetchData) {
			res.send("Email não está cadastrado");
		}

		if (result) {
			const token = jwt.sign(
				{
					userId: FetchData?.id,
					email: FetchData?.email,
					username: FetchData?.username,
				},
				String(process.env.JWTKEY),
				{ expiresIn: "1d" },
			);

			res.send({ message: "Logado", token: token });
			res.redirect("/profile");
		}

		res.status(401);
		res.send("Senha incorreta");
	} catch (err) {
		res.status(500);
		res.send({ error: err });
	}
};
