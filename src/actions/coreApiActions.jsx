import http from "../interceptors/http";

export const getAuthUser = async () => {
    try {
        const res = await http.get('auth/me');
        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error.response);
    }
}

export const postVerificationMail = async () => {
    try {
        const res = await http.post('auth/send-verification-mail');
        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error.data);
    }
}

export const postVerificationCode = async (data) => {
    try {
        const res = await http.post('auth/check-verification-code', data);
        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error.response);
    }
}