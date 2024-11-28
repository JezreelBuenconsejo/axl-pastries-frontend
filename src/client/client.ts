import axios, { AxiosInstance } from "axios";
import {
	ADMIN_LOGIN,
	CAKES_ENDPOINT,
	ADD_CAKE_ENDPOINT,
	DELETE_CAKE_ENDPOINT,
	UPDATE_CAKE_ENDPOINT,
	getApiRoot,
	CATEGORIES_ENDPOINT,
	ADD_CATEGORY_ENDPOINT,
	DELETE_CATEGORY_ENDPOINT,
	UPDATE_CATEGORY_ENDPOINT
} from "./environment";
import { AdminLoginRequest, AdminLoginResponse } from "@/types/auth";
import { Cake } from "@/types/cake";
import { Category } from "@/types/categories";

// Helper function to get token from localStorage
function getToken(): string | null {
	return localStorage.getItem("token");
}

// Axios client setup with interceptors for authorization
class AxlPastriesClient {
	client: AxiosInstance;

	constructor() {
		this.client = axios.create({
			baseURL: getApiRoot()
		});

		// Interceptor to automatically add Authorization headers
		this.client.interceptors.request.use(config => {
			const token = getToken();
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		});
	}

	// Admin Login
	async adminLogin(data: AdminLoginRequest): Promise<AdminLoginResponse> {
		const res = await this.client.post<AdminLoginResponse>(ADMIN_LOGIN, data);
		return res.data;
	}

	// Get all cakes
	async getCakes(): Promise<Cake[]> {
		const res = await this.client.get<Cake[]>(CAKES_ENDPOINT);
		return res.data;
	}

	// Add a new cake
	async addCake(cake: FormData): Promise<Cake> {
		const res = await this.client.post<Cake>(ADD_CAKE_ENDPOINT, cake);
		return res.data;
	}

	// Delete a cake
	async deleteCake(id: number): Promise<void> {
		await this.client.delete(`${DELETE_CAKE_ENDPOINT}?id=${id}`);
	}

	// Update a cake
	async updateCake(id: number, cake: FormData): Promise<Cake> {
		const res = await this.client.put<Cake>(`${UPDATE_CAKE_ENDPOINT}?id=${id}`, cake);
		return res.data;
	}

	// Get all categories
	async getCategories(): Promise<Category[]> {
		const res = await this.client.get<Category[]>(CATEGORIES_ENDPOINT);
		console.log(res.data);
		return res.data;
	}

	// Add a new category
	async addCategory(category: { name: string }): Promise<Category> {
		const res = await this.client.post<Category>(ADD_CATEGORY_ENDPOINT, category);
		return res.data;
	}

	// Delete a category
	async deleteCategory(id: number): Promise<void> {
		await this.client.delete(`${DELETE_CATEGORY_ENDPOINT}?id=${id}`);
	}

	// Update a category
	async updateCategory(id: number, category: { name: string }): Promise<Category> {
		const res = await this.client.put<Category>(`${UPDATE_CATEGORY_ENDPOINT}?id=${id}`, category);
		return res.data;
	}
}

// Create an instance of the client
const AxlPastriesClientInstance = new AxlPastriesClient();
export default AxlPastriesClientInstance;
