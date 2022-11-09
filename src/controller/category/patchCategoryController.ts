import { Request, Response } from "express"
import { prisma } from "../../database/prismaconnection"

export const patchCategoryController = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params
        const { name } = req.body as { name: string }
        if (name) {
            await prisma.category.update({ where: { id: _id }, data: { name: name } }).then(() => {
                return res.status(200).send({ message: "Category updated" })
            }).catch(err => {
                return res.status(500).send({ error: err })
            })
        }
    } catch (err) {
        return res.status(500).send({ error: err })
    }
}