import { Request, Response } from "express";
import { prisma } from "../../database/prismaconnection"

export const deleteCategoryController = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params

        await prisma.category.delete({ where: { id: _id } }).then(() => {
            return res.status(200).send({ message: "Category deleted" })
        }).catch(err => {
            return res.status(500).send({ error: err })
        })
    } catch (err) {
        return res.status(500).send({ error: err })
    }
}