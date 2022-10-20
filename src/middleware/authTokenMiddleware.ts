import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const authTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const authToken = req.headers.authorization;
		if (!authToken) {
			res.send({ error: "Unauthorized" });
		}
		const [, token]: any = authToken?.split(" ");

		verify(token, String(process.env.JWTKEY));

		return next();
	} catch (err) {
		res.send({ error: "Unauthorized" });
	}
};
