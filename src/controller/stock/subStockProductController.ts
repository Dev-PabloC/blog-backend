import { Request, Response } from "express";
import { prisma } from "../../database/prismaconnection";
import { getDataTokenPromise } from "../../utils/decodedPromise";

export const subStockProductController = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params

        const token = req.headers["authorization"]?.slice(7)
        const { userId } = await getDataTokenPromise(String(token)) as { userId: string }
        const result = await prisma.product.findFirst({ where: { id: _id } })

        if (result?.userId === userId) {

            await prisma.product.update({
                where: { id: _id },
                data: {
                    
                }
            }).then(() => {
                return res.status(200).send({ message: "Product removed on stock" })
            }).catch(err => {
                return res.status(500).send({ error: err })
            })

        }

        return res.status(401).send({ message: "Acess denied" })

    } catch (err) {
        return res.status(500).send({ error: err })
    }
}