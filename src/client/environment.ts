interface EnvironmentUrls {
	apiRoot: string;
}

interface Environments {
	dev: EnvironmentUrls;
	prod: EnvironmentUrls;
}

const environments: Environments = {
	dev: {
		apiRoot: "http://localhost:8080"
	},
	prod: {
		apiRoot: "https://axl-pastries.up.railway.app"
	}
};

export const getApiRoot = (): string => {
	const isProd = process.env.NODE_ENV === "production";
	return isProd ? environments.prod.apiRoot : environments.dev.apiRoot;
};

// Endpoints
export const ADMIN_LOGIN = `${getApiRoot()}/admin/login`;

// Cakes
export const CAKES_ENDPOINT = `${getApiRoot()}/cakes`;
export const ADD_CAKE_ENDPOINT = `${getApiRoot()}/admin/cakes/add`;
export const UPDATE_CAKE_ENDPOINT = `${getApiRoot()}/admin/cakes/update`;
export const DELETE_CAKE_ENDPOINT = `${getApiRoot()}/admin/cakes/delete`;

// Categories
export const CATEGORIES_ENDPOINT = `${getApiRoot()}/categories`;
export const ADD_CATEGORY_ENDPOINT = `${getApiRoot()}/admin/categories/add`;
export const UPDATE_CATEGORY_ENDPOINT = `${getApiRoot()}/admin/categories/update`;
export const DELETE_CATEGORY_ENDPOINT = `${getApiRoot()}/admin/categories/delete`;
