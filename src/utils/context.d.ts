import { Request, Response } from "express";

export type context = {
	req: Request;
	res: Response;
};
