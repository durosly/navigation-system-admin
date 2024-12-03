import { isAxiosError } from "axios";

export function handleError(error: unknown) {
	let message = "Something went wrong";
	if (error instanceof Error) {
		if (isAxiosError(error)) {
			message = error.response?.data.message;

			if (!message && error.response?.statusText) {
				message = error.response?.statusText;
			}
		} else {
			message = error?.message;
		}
	}

	return message;
}
