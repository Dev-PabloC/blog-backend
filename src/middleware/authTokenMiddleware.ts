import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const authTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const authToken = window.sessionStorage.getItem("token");
		if (!authToken) {
			res.statusCode = 401;
			res.send({ error: "no login" });
		}

		verify(String(authToken), String(process.env.JWTKEY));

		next();
	} catch (err) {
		res.statusCode = 403;
		res.send({ error: err });
	}
};
