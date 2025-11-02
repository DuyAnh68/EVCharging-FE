import axiosClient from "./axiosClient";

const stationApi = {
  getBookingByStationId: (stationId) =>
    axiosClient.get(`/api/bookings/station/${stationId}`),
  postBooking: (bookingData) => axiosClient.post(`/api/bookings`, bookingData),
  payBooking: (bookingId) =>
    axiosClient.post(`/payment-transaction/booking/${bookingId}`),
  getBookingByUserId: (userId) =>
    axiosClient.get(`api/bookings/user/${userId}`),
  getBookingById: (id) => axiosClient.get(`api/bookings/${id}`),
};

export default stationApi;
