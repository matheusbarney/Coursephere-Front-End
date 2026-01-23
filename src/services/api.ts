import axios from 'axios';
import { toast } from "react-toastify";
// import { getToken } from "../utils/token";

const api = axios.create({
 baseURL: 'http://localhost:8000',
});

api.interceptors.response.use(null, (error) => {
    const expectedError = error.response && error.response >= 400 && error.response < 500;
    
    if (!expectedError) {
        toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    return Promise.reject(error);
});

/*
api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
*/

export default {
  get: api.get,
  post: api.post,
  put: api.put,
  delete: api.delete,
};
