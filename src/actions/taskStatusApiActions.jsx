import http from "../interceptors/http";

export const getTaskStatusList = async params => {
    try {
        const res = await http.get('task-statuses',
            {
                params: {...params}
            }
        );

        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error.data);
    }
}

export const postTaskStatus = async data => {
    try {
        const res = await http.post('task-statuses', data);
        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error.data);
    }
}

export const getTaskStatus = async id => {
    try {
        const res = await http.get(`task-statuses/${id}`);
        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error.data);
    }
}

export const deleteTaskStatus = async id => {
    try {
        const res = await http.delete(`task-statuses/${id}`);
        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error.data);
    }
}

export const putTaskStatus = async (id, data) => {
    try {
        const res = await http.put(`task-statuses/${id}`, data);
        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error.data);
    }
}