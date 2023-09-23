import http from "../interceptors/http";

export const getTaskList = async params => {
    try {
        const res = await http.get('tasks',
            {
                params: { ...params }
            }
        );

        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error.data);
    }
}

export const postTask = async data => {
    try {
        const res = await http.post('tasks', data);
        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error.data);
    }
}

export const getTask = async id => {
    try {
        const res = await http.get(`tasks/${id}`);
        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error.data);
    }
}

export const deleteTask = async id => {
    try {
        const res = await http.delete(`tasks/${id}`);
        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error.data);
    }
}