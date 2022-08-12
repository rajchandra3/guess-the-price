import axios from "axios";

const BASE_URL = "YOUR_APP_URL";

const BaseClient = axios.create({
    baseURL: BASE_URL,
});

BaseClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            return {
                ...config,
                headers: {
                    ...config.headers,
                    Authorization: `Bearer ${token}`,
                },
            };
        }

        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default BaseClient;
