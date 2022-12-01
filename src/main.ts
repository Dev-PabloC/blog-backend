import { app } from "./app";
import { createServer } from "http";
import dotenv from "dotenv";
dotenv.config();

createServer(app).listen(4000, () => {
	console.log("Server ligando");
});
