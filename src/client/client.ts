import axios, { AxiosInstance } from "axios";
import {
	CAKES_ENDPOINT,
	ADD_CAKE_ENDPOINT,
	DELETE_CAKE_ENDPOINT,
	UPDATE_CAKE_ENDPOINT,
	getApiRoot,
	CATEGORIES_ENDPOINT,
	ADD_CATEGORY_ENDPOINT,
	DELETE_CATEGORY_ENDPOINT,
	UPDATE_CATEGORY_ENDPOINT,
	USER_DETAILS,
	VERIFY_ADMIN
} from "./environment";
import { Cake } from "@/types/cake";
import { Category } from "@/types/categories";
import { UserDetails } from "@/types/user";

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
	// Verify Admin
	async verifyAdmin(): Promise<{ role: string; username: string }> {
		const res = await this.client.post<{ role: string; username: string }>(VERIFY_ADMIN, {});
		return res.data;
	}

	// Get User Details
	async getUserDetails(): Promise<UserDetails> {
		const res = await this.client.post<UserDetails>(USER_DETAILS, {});
		return res.data;
	}

	// Get all cakes
	async getCakes(): Promise<Cake[]> {
		const res = await this.client.get<Cake[]>(CAKES_ENDPOINT);
		return res.data;
	}

	// Get cake by ID
	async getCakeById(id: number): Promise<Cake> {
		const res = await this.client.get<Cake>(`${CAKES_ENDPOINT}/${id}`);
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
