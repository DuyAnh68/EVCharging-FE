import axiosClient from "./axiosClient";

const sessionApi = {
  getSessionsByVehicleId: (vehicleId) =>
    axiosClient.get(`/api/charging-sessions/vehicle/${vehicleId}`),
  startSession: (bookingId, startData) =>
    axiosClient.post(`api/charging-sessions/start/${bookingId}`, startData),
  endSession: (sessionId, endData) =>
    axiosClient.put(`/api/charging-sessions/end/${sessionId}`, endData),
  startSessionOnStation: (startData) =>
    axiosClient.post(`api/member/sessions/start`, startData),
  endSessionOnStation: (sessionId, endData) =>
    axiosClient.put(`api/member/sessions/end/${sessionId}`, endData),
  startSessionStaff: (startData) =>
    axiosClient.post(`/api/staff/sessions/start`, startData),
};

export default sessionApi;
