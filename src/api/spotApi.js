import axiosClient from "./axiosClient";

const spotApi = {
  getSpotsByStationId: (stationId) =>
    axiosClient.get(`/api/spots/station/${stationId}`),
};

export default spotApi;
