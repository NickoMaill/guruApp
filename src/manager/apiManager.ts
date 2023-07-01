import configManager from "./configManager";

const apiHost = "http://192.168.1.55:8080";

class ServerApiManager {
	public async get<T>(route: string, headersRequest?: any): Promise<T> {
		const headers = new Headers();
        
        for (const header in headersRequest) {
            headers.set(header, headersRequest[header]);
        }

		const options: RequestInit = {
			method: "GET",
			// credentials: "include",
			headers,
		};

		const url = `${apiHost}/${route}`;

		const request = await fetch(url, options);

		const response = await request.json();

		return response as T;
	}

	// public async getFile<T>(route: string, headersRequest?: any): Promise<Blob> {
	// 	const headers = new Headers();

	// 	for (const header in headersRequest) {
	// 		headers.set(header, headersRequest[header]);
	// 	}

	// 	const options: RequestInit = {
	// 		method: "GET",
	// 		// credentials: "include",
	// 		headers,
	// 	};

	// 	const url = `${apiHost}/${route}`;

	// 	const request = await fetch(url, options);

	// 	const response = await request.blob();
	// 	return response;
	// }

	public async post<T>(route: string, body?: T, formData?: FormData, headersRequest?: any) {
		console.log(apiHost);
		const headers = new Headers();
		for (const header in headersRequest) {
			headers.set(header, headersRequest[header]);
		}

		body && headers.set("Content-Type", "application/json");
		headers.set("Accept", "application/json");

		const options: RequestInit = {
			method: "POST",
			credentials: "include",
			headers,
			body: JSON.stringify(body),
		};
		const url = `${apiHost}/${route}`;
		const request = await fetch(url, options);

		const response = await request.json();
		return response;
	}

	public async put<T>(route: string, body?: T, formData?: FormData, headersRequest?: any) {
		const headers = new Headers();
		for (const header in headersRequest) {
			headers.set(header, headersRequest[header]);
		}

		body && headers.set("Content-Type", "application/json");
		headers.set("Accept", "application/json");

		const options: RequestInit = {
			method: "PUT",
			// credentials: "include",
			headers,
			body: formData ? formData : JSON.stringify(body),
		};

		const url = `${apiHost}/${route}`;
		const request = await fetch(url, options);

		const response = await request.json();
		return response;
	}

	public async delete<T>(route: string, body?: T, headersRequest?: any) {
		const headers = new Headers();
		for (const header in headersRequest) {
			headers.set(header, headersRequest[header]);
		}

		body && headers.set("Content-Type", "application/json");
		headers.set("Accept", "application/json");

		const options: RequestInit = {
			method: "DELETE",
			// credentials: "include",
			headers,
			body: body ? JSON.stringify(body) : null,
		};

		const url = `${apiHost}/${route}`;
		const request = await fetch(url, options);

		const response = await request.json();
		return response;
	}
}

export default new ServerApiManager();
