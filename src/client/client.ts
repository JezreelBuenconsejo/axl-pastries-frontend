import axios, { AxiosInstance } from "axios";
import {
  ADMIN_LOGIN,
  CAKES_ENDPOINT,
  ADD_CAKE_ENDPOINT,
  DELETE_CAKE_ENDPOINT,
  UPDATE_CAKE_ENDPOINT,
  getApiRoot,
} from "./environment";
import { AdminLoginRequest, AdminLoginResponse } from "@/types/auth";
import { Cake } from "@/types/cake";

// Helper function to get token from localStorage
function getToken(): string | null {
  return localStorage.getItem("token");
}

// Axios client setup with interceptors for authorization
class AxlPastriesClient {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: getApiRoot(),
    });

    // Interceptor to automatically add Authorization headers
    this.client.interceptors.request.use((config) => {
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
}

// Create an instance of the client
const AxlPastriesClientInstance = new AxlPastriesClient();
export default AxlPastriesClientInstance;
