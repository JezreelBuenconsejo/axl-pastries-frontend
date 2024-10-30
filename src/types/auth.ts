export interface AdminLoginRequest {
	username: string;
	password: string;
}

export interface AdminLoginResponse {
	message: string;
	token?: string;
	error?: string;
}
