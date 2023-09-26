import http from "../interceptors/http";

export const getUserSelect = async () => {
    try {
        const res = await http.get('commons/users');
        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error.data);
    }
}

export const getStatusSelect = async () => {
    try {
        const res = await http.get('commons/task-statuses');
        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error.data);
    }
}

export const getTotalNumberofTask = async () => {
    try {
        const res = await http.get('commons/total-task');
        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error.data);
    }
}