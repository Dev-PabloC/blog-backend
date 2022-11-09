import { Request, Response, NextFunction } from "express"
import { prisma } from "../database/prismaconnection"
import { getDataTokenPromise } from "../utils/decodedPromise"

export const adminRoleMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers["authorization"]?.slice(7)
        const { email } = await getDataTokenPromise(String(token)) as { email: string }
        const result = await prisma.user.findFirst({ where: { email: email } })

        if (result?.admin === true) {
            next()
        } else {
            return res.status(401).send({ message: "No admin role, acess denied" })
        }
    } catch (err) {
        console.log(err)
    }
}