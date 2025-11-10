import axiosClient from "./axiosClient";

const vehicleListApi = {
  getVehicleList: () => axiosClient.get("/api/member/vehicle"),
  addVehicle: (credentials) => axiosClient.post("/api/member/vehicle", credentials),
  getVehicleByBrand: (id) =>
    axiosClient.get(`/api/admin/model/by-brand`, {
      params: { id: id },
    }),
  getVehicleById: (id) => axiosClient.get(`/api/member/vehicle/${id}`),
  deleteVehicle: (id) => axiosClient.delete(`/api/member/vehicle/${id}`),
};

export default vehicleListApi;
