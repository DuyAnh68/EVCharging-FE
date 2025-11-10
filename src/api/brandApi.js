import axiosClient from "./axiosClient";

const brandApi = {
  getBrand: () => axiosClient.get("/api/admin/vehicle-brand/all"),
};

export default brandApi;
