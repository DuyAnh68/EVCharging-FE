import axiosClient from "./axiosClient";

const vehicleListApi = {
    getVehicleList: () => axiosClient.get("/vehicle/for-user"),
    addVehicle: (credentials) => axiosClient.post("/vehicle", credentials),
    getVehicleByBrand: (id) => axiosClient.get(`/model/by-brand`, {
      params: { id: id }
    }),
    getVehicleById: (id) => axiosClient.get(`/vehicle/${id}`),
    deleteVehicle: (id) => axiosClient.delete(`/vehicle/${id}`)
};

export default vehicleListApi