import { Request, Response } from "express";
import { prisma } from "../../database/prismaconnection"

export const getUniqueProductController = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params
        const result = await prisma.product.findFirst({ where: { id: _id } })
        if (result) {
            return res.status(200).json(result)
        }
        return res.status(500).send({ message: "product not found" })
    } catch (err) {
        return res.status(500).send({ error: err })
    }
}