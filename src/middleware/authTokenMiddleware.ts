import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const authTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const authToken = req.headers.authorization;
	if (!authToken) {
		res.status(401);
		res.send("não autorizado");
		res.redirect("/login");
	}
	const [, token]: any = authToken?.split(" ");

	try {
		verify(token, String(process.env.JWTKEY));

		return next();
	} catch (err) {
		res.status(401);
		res.redirect("/login");
	}
};
