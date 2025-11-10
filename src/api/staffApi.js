import axiosClient from "./axiosClient";

const staffApi = {
//   getSessionsByVehicleId: (vehicleId) =>
//     axiosClient.get(`/api/charging-sessions/vehicle/${vehicleId}`),
  startSessionStaff: (startData) =>
    axiosClient.post(`/api/staff/sessions/start`, startData),
  endSessionStaff: (sessionId, endData) =>
    axiosClient.post(`/api/staff/sessions/end/${sessionId}`, endData),
};

export default staffApi;