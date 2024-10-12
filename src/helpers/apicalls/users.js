import axios from 'axios';

export const registerUser = async (payload) => {
    try {
        const response = await axios.post('/api/users/register', payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const loginUser = async (payload) => {
    try {
        const response = await axios.post('/api/users/login', payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getUserInfo = async () => {
    try {
        const response = await axios.post('/api/users/get-user-info');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
