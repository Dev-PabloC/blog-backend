import { prisma } from "../../database/prismaconnection";
import { Request, Response } from "express"
import { ICreateUserData } from "../../utils/user";

export const registerController = async (req: Request, res: Response) => {
    try {
        let { username, email, password }: ICreateUserData = req.body;

        if (!username || !email || !password) {
            return res.status(400).send({ message: "Send a data correct" });
        }

        ;

        await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: password
            }
        })
            .then(() => {
                return res.status(201).send({ message: "User created" });
            })
            .catch((err) => {
                if (err.message.includes("Unique constraint failed on the constraint: `users_username_key`")) {
                    return res.status(400).send({ message: "username already exist" });
                } else if (err.message.includes("Unique constraint failed on the constraint: `users_email_key`")) {
                    return res.status(400).send({ message: "email already exist" });
                } else {
                    return res.status(500).send({ error: err.message });
                }
            });
    } catch (err) {
        console.error(err)
        return res.status(500).send({ error: err });
    }
};
