import jwt from "jsonwebtoken";
import { Request, Response } from "express";


export const logoutController = async (req: Request, res: Response) => {
	try {
		res.status(200);
	} catch (err) {
		res.status(500);
		res.send({ error: err });
	}
};
