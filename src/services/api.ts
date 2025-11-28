let AUTH_TOKEN: string | null = null;

export const api = {
    get: async (url: string, config?: any) => {
        console.log("[MOCK API] GET", url, {token: AUTH_TOKEN});
        return {data: null};
    },
    post: async (url: string, body?: any, config?: any) => {
        console.log("[MOCK API] POST", url, body, {token: AUTH_TOKEN});
        return {data: null};
    },
    put: async (url: string, body?: any, config?: any) => {
        console.log("[MOCK API] PUT", url, body, {token: AUTH_TOKEN});
        return {data: null};
    },
    delete: async (url: string, config?: any) => {
        console.log("[MOCK API] DELETE", url, {token: AUTH_TOKEN});
        return {data: null};
    }
};

export const setAuthInterceptor = (token?: string) => {
    AUTH_TOKEN = token || null;
    console.log("[MOCK API] Auth token configurado:", AUTH_TOKEN);
};