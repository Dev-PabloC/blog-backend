import jwt from "jsonwebtoken";
import { context } from "../../utils/context";
import { prisma } from "../../database/prismaconnection";

export const loginController = async ({ req, res }: context) => {
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

		if (result && result.password === password) {
			const token = jwt.sign(
				{
					userId: result.id,
					email: result.email,
					username: result.username,
				},
				String(process.env.JWTKEY),
				{ expiresIn: "1d" },
			);
			res.cookie("token", token, { maxAge: 1000 * 60 * 60, secure: true, signed: true });
			return res.status(200).send("Login:true");
		}
		return res.status(403).send("Wrong password");
	} catch (err) {
		return res.status(500).send(err);
	}
};
