import axios from 'axios';

// ${input}/json/
const api = axios.create({
    baseURL: 'https://viacep.com.br/ws/',
});

export default api;
