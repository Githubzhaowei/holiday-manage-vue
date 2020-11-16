import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000/';

export const login = (params) => {
    return axios.post('api/login', params);
};
