import http from "../interceptors/http";

export const getAuthUser = async () => {
    try {
        const res = await http.get('auth/me');
        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error.data);
    }
}