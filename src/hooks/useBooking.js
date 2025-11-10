import { useState, useEffect } from "react";
import bookingApi from "../api/bookingApi";

const useBooking = () => {
  const [stationBookings, setStationBookings] = useState([]);
  const [bookingInfo, setBookingInfo] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookingsByStationId = async (stationId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await bookingApi.getBookingByStationId(stationId);
      if (response) {
        setStationBookings(response);
        setLoading(false);
        setError(null);
      }
    } catch (err) {
      console.error("Fetch stations failed:", err);
      setError(err.message || "Không thể tải bookings");
    } finally {
      setLoading(false);
      setError(null);
    }
  };

  const postBooking = async (bookingData) => {
    setLoading(true);
    setError(null);

    console.log("bookingData", bookingData);

    try {
      // Format datetime to match Java LocalDateTime format yyyy-MM-dd'T'HH:mm:ss
      // Use local getters to avoid toISOString() -> UTC conversion
      const formatDateTime = (dateInput) => {
        const d = dateInput instanceof Date ? dateInput : new Date(dateInput);
        const pad = (n) => String(n).padStart(2, "0");
        const year = d.getFullYear();
        const month = pad(d.getMonth() + 1);
        const day = pad(d.getDate());
        const hours = pad(d.getHours());
        const minutes = pad(d.getMinutes());
        const seconds = pad(d.getSeconds());
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
      };

      console.log("format data", formatDateTime(bookingData.timeToCharge));
      // Format dữ liệu trước khi gửi
      const formattedData = {
        userId: bookingData.userId,
        stationId: bookingData.stationId,
        vehicleId: bookingData.vehicleId,
        timeToCharge: formatDateTime(bookingData.timeToCharge),
        endTime: formatDateTime(bookingData.endTime),
      };

      console.log("Formatted booking data:", formattedData);

      const res = await bookingApi.postBooking(formattedData);

      if (res) {
        setBookingInfo(res);
        return res;
      }
    } catch (error) {
      console.error("Booking error:", error);
      setError(error.message || "Không thể đặt chỗ");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const bookingPayment = async (bookingId) => {
    setLoading(true);
    setError(null);
    try {
      const res = await bookingApi.payBooking(bookingId);
      if (res) {
        setLoading(false);
        setError(null);
        return res;
      }
    } catch (error) {
      setError(error.message || "Không thể lấy thông tin thanh toán");
    } finally {
      setLoading(false);
      setError(null);
    }
  };

  const getBookingByUserId = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const res = await bookingApi.getBookingByUserId(userId);
      if (res) {
        setLoading(false);
        setError(null);
        return res;
      }
    } catch (err) {
      setError(err.message || "Không thể lấy thông tin booking của user");
    } finally {
      setLoading(false);
      setError(null);
    }
  };

  const getBookingById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await bookingApi.getBookingById(id);
      if (res) {
        setLoading(false);
        setError(null);
        return res;
      }
    } catch (err) {
      setError(err.message || "Không thể lấy thông tin booking của user");
    } finally {
      setLoading(false);
      setError(null);
    }
  };

  useEffect(() => {
    fetchBookingsByStationId();
  }, []);

  return {
    stationBookings,
    fetchBookingsByStationId,
    loading,
    error,
    postBooking,
    bookingInfo,
    bookingPayment,
    getBookingByUserId,
    getBookingById,
  };
};

export default useBooking;
