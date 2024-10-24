interface EnvironmentUrls {
    apiRoot: string;
  }
  
  interface Environments {
    dev: EnvironmentUrls;
    prod: EnvironmentUrls;
  }
  
  const environments: Environments = {
    dev: {
      apiRoot: "https://axl-pastries.up.railway.app", 
    },
    prod: {
      apiRoot: "https://axl-pastries.up.railway.app", 
    },
  };
  
  export const getApiRoot = (): string => {
    const isProd = process.env.NODE_ENV === "production";
    return isProd ? environments.prod.apiRoot : environments.dev.apiRoot;
  };
  
  // Endpoints
  export const ADMIN_LOGIN = `${getApiRoot()}/auth/login`;
  export const CAKES_ENDPOINT = `${getApiRoot()}/cakes`;
  export const ADD_CAKE_ENDPOINT = `${getApiRoot()}/admin/cakes`;
  export const UPDATE_CAKE_ENDPOINT = `${getApiRoot()}/admin/cakes/update`;
  export const DELETE_CAKE_ENDPOINT = `${getApiRoot()}/admin/cakes/delete`;
  