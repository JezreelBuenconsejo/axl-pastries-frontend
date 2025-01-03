export interface LoginRequest {
	username: string;
	password: string;
}

export interface AdminLoginResponse {
	message: string;
	token?: string;
	error?: string;
}

export interface RegisterUserRequest {
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	password: string;
}
