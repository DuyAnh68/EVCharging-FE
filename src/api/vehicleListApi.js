import axiosClient from "./axiosClient";

const vehicleListApi = {
  getVehicleList: () => axiosClient.get("/member/vehicle"),
  addVehicle: (credentials) => axiosClient.post("/member/vehicle", credentials),
  getVehicleByBrand: (id) =>
    axiosClient.get(`/admin/model/by-brand`, {
      params: { id: id },
    }),
  getVehicleById: (id) => axiosClient.get(`/member/vehicle/${id}`),
  deleteVehicle: (id) => axiosClient.delete(`/member/vehicle/${id}`),
};

export default vehicleListApi;
