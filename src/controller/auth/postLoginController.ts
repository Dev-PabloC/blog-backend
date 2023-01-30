import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { Request, Response } from "express"
import { prisma } from "../../database/prismaconnection";

export const loginController = async (req: Request, res: Response) => {
	try {
		const { email, password }: string | any = req.body;
		if (!email) {
			return res.status(400).send({ message: "insira um email" });
		}
		if (!password) {
			return res.status(400).send({ message: "insira um password" });
		}

		const result = await prisma.user.findFirst({ where: { email: email } });

		if (!result) {
			return res.status(500).send({ message: "Email does not exist" });
		}
		const validPassword = await bcrypt.compare(password, result.password)

		if (result && validPassword) {
			const token = jwt.sign(
				{
					userId: result.id,
					email: result.email,
					username: result.username,
				},
				String(process.env.JWTKEY),
				{ expiresIn: "1d" },
			);

			return res.status(200).send({
				Message: "Login:true",
				Token: token
			});
		}
		return res.status(400).send("Wrong password");
	} catch (err) {
		console.error(err)
		return res.status(500).send(err);
	}
};
