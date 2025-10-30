import axiosClient from "./axiosClient";

const brandApi = {
    getBrand: () => axiosClient.get("/vehicle-brand/all"),
};

export default brandApi;