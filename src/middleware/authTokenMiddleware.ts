import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const authTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { token } = req.cookies;

		if (!token) {
			return res.status(401).send({ error: "no login" });
		}

		verify(String(token), String(process.env.JWTKEY), (err, decoded) => {
			if (err) {
				return res.status(401).send({ message: "acess denied" });
			}
			next();
		});
	} catch (err) {
		console.log(err);
		return res.status(500).send({ error: err });
	}
};
