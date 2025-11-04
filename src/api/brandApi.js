import axiosClient from "./axiosClient";

const brandApi = {
    getBrand: () => axiosClient.get("/admin/vehicle-brand/all"),
};

export default brandApi;