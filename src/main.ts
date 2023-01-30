import { app } from "./app";
import { createServer } from "http";
import dotenv from "dotenv";
dotenv.config();

createServer(app).listen(process.env.PORT, () => {
	console.log("Server ligando");
});
