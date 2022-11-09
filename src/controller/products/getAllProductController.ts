import { Request, Response } from "express";
import { prisma } from "../../database/prismaconnection"

export const getAllProductController = async (req: Request, res: Response) => {
    try {
        return prisma.product.findMany()
    } catch (err) {
        return res.status(500).send({ error: err })
    }
}