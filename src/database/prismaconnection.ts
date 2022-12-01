import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"

export const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
    if (params.model === "User" && params.action === "create" || params.action === "update" && params.args.data.password) {
        const hashPassword = await bcrypt.hash(params.args.data.password, 12)
        params.args.data.password = hashPassword
    }

    return next(params)
})