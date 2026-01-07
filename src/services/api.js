import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key: 'c18b04262869c1825deec978c32f8148',
        language: 'pt-BR',
        page: 1
    }

});


export default api;