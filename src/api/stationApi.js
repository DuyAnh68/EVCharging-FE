import axiosClient from "./axiosClient";

const stationApi = {
  getStation: () => axiosClient.get("/api/chargingStation"),
  getStationById: (id) => axiosClient.get(`/api/chargingStation/${id}`),
};

export default stationApi;
