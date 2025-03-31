import axios from "axios";

const clienteAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
       'X-Requested-With': 'XMLHttpRequest',
        "Accept": "application/json",
    },
    withCredentials: true,

});

export default clienteAxios;