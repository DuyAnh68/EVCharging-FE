import { useState, useEffect } from "react";
import bookingApi from "../api/bookingApi";

const useBooking = () => {
  const [stationBookings, setStationBookings] = useState([]);
  const [bookingInfo, setBookingInfo] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(bookingInfo);

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
    try {
      const res = await bookingApi.postBooking(bookingData);
      if (res) {
        console.log(res);
        setBookingInfo(res);
        setLoading(false);
        setError(null);
        return res;
      }
    } catch (error) {
      setError(error.message || "Không thể đặt chỗ");
    } finally {
      setLoading(false);
      setError(null);
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
