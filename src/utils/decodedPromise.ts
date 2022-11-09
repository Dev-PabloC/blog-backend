import { verify } from "jsonwebtoken";

export async function getDataTokenPromise(token: string) {
	const data = verify(String(token), String(process.env.JWTKEY));

	return new Promise((resolve, reject) => {
		if (data) {
			resolve(data);
		}
		if (!data) {
			reject("No data in token");
		}
	});
}
