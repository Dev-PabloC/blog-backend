import { Request, Response } from "express";
import { prisma } from "../../database/prismaconnection"
import { getDataTokenPromise } from "../../utils/decodedPromise";

export const deleteProductController = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params
        const token = req.headers["authorization"]?.slice(7)
        const { userId } = await getDataTokenPromise(String(token)) as { userId: string }
        const result = await prisma.product.findFirst({ where: { id: _id } })
        if (result?.userId === userId) {
            await prisma.product.delete({ where: { id: _id } }).then(() => {
                return res.status(200).send({ message: "Product deleted" })
            }).catch(err => {
                return res.status(500).send({ error: err })
            })
        }
        return res.status(401).send({ message: "acess denied" })
    } catch (error) {
        return res.status(500).send({ err: error })
    }
}