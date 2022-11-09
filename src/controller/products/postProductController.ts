import { Request, Response } from "express";
import { prisma } from "../../database/prismaconnection";
import { getDataTokenPromise } from "../../utils/decodedPromise";

export const postProductController = async (req: Request, res: Response) => {
    try {
        const { name, desc, value, idCategory } = req.body as { name: string, desc: string, value: number, idCategory: string }
        const authToken = req.headers["authorization"]?.slice(7)
        const { userId } = await getDataTokenPromise(String(authToken)) as { userId: string }
        if (name && desc) {
            await prisma.user.update({
                where: { id: userId },
                data: {
                    product: {
                        create: {
                            name: name,
                            description: desc,
                            value: value,
                            category: {
                                connect: { id: idCategory }
                            }
                        }
                    }
                }
            }).then(() => {
                return res.status(201).send({ message: "Product created" })
            }).catch(err => {
                return res.status(500).send({ error: err })
            })
        }

        return res.status(400).send({ message: "bad request, verify fields 'name', 'desc', 'value'" })
    } catch (err) {
        return res.status(500).send({ error: err })
    }
}