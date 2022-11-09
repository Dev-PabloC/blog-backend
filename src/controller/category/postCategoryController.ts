import { Request, Response } from "express"
import { prisma } from "../../database/prismaconnection"

export const postCategoryController = async (req: Request, res: Response) => {
    try {

        const { name } = req.body as { name: string }
        if (name) {
            await prisma.category.create({ data: { name: name } }).then(() => {
                return res.status(201).send({ message: "Category created" })

            }).catch((err) => {
                return res.status(500).send({ error: err })
            })

        }
        return res.status(400).send({ message: "No name field in request body" })
    } catch (err) {
        return res.status(500).send({ error: err })
    }
}