import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSpots from "../../hooks/useSpot";
import useStation from "../../hooks/useStation";
import useBooking from "../../hooks/useBooking";
import dayjs from "dayjs";
import useSession from "../../hooks/useSession";
import { Modal, Select, InputNumber } from "antd";
import { toast } from "react-toastify";
import useSessionStore from "../../hooks/useSessionStore";
import useInvoice from "../../hooks/useInvoice";
import { Tabs } from "antd";

const StationSpot = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [percentBefore, setPercentBefore] = useState(0);
  const [batteryCapacity, setBatteryCapacity] = useState(0);
  const { sessionData, setSessionData } = useSessionStore();
  const { getInvoiceBySessionId, confirmPaid, getStaffInvoice, invoices } =
    useInvoice();
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const [activeTab, setActiveTab] = useState("sessions"); // tab mặc định

  const navigate = useNavigate();
  const { id } = useParams();
  const {
    spots,
    loading: spotsLoading,
    error: spotsError,
    getSpotsByStationId,
  } = useSpots();
  const {
    station,
    loading: stationLoading,
    error: stationError,
    getStationById,
  } = useStation();
  const {
    stationBookings,
    loading: bookingsLoading,
    error: bookingsError,
    fetchBookingsByStationId,
  } = useBooking();

  const { sessions, getAllSession, startSessionStaff, endSessionStaff } =
    useSession();

  useEffect(() => {
    if (id) {
      getStationById(id);
      getSpotsByStationId(id);
      fetchBookingsByStationId(id);
    }
  }, [id]);

  useEffect(() => {
    getAllSession();
  }, []);

  useEffect(() => {
    getStaffInvoice();
  }, []);

  console.log("invoices", JSON.stringify(invoices));

  console.log(sessions);

  const filterSession = sessions?.filter(
    (session) =>
      (session.stationId.toString() === id && session.status === "ACTIVE") ||
      session.spotType === "COMPLETE"
  );

  console.log(spots);

  const availableSpots = spots.filter(
    (spot) => spot.status === "AVAILABLE" && spot.spotType === "WALK_IN"
  );

  const handleStartSession = () => {
    setPercentBefore(Math.floor(Math.random() * 91)); // random 0–90
    setSelectedSpot(null);
    setBatteryCapacity(0);
    setIsModalOpen(true);
  };

  const handleConfirmStart = async () => {
    if (!selectedSpot) {
      toast.error("Vui lòng chọn bãi sạc!");
      return;
    }
    if (!batteryCapacity || batteryCapacity <= 0) {
      toast.error("Vui lòng nhập dung lượng pin!");
      return;
    }

    try {
      const payload = {
        spotId: selectedSpot,
        percentBefore,
      };

      const res = await startSessionStaff(payload);
      if (res) {
        const newSessionId = res.sessionId;

        setSessionData((prev) => ({
          ...prev,
          [newSessionId]: {
            batteryCapacity,
            percentBefore,
          },
        }));

        toast.success("Bắt đầu phiên sạc thành công!");
        getAllSession();
        setIsModalOpen(false);
      }
    } catch (err) {
      toast.error("Không thể bắt đầu phiên sạc!");
    }
  };

  console.log(sessionData);

  console.log(station?.pricePerKwh);
  const handleEndSession = async (sessionId) => {
    const data = await sessionData[sessionId];
    console.log(data);

    if (!data) {
      toast.error("Không có dữ liệu pin cho phiên này!");
      return;
    }

    console.log(batteryCapacity);
    console.log(percentBefore);
    const payload = {
      ratePerKwh: station?.pricePerKwh,
      batteryCapacity: data.batteryCapacity,
      percentBefore: data.percentBefore,
    };

    const res = await endSessionStaff(sessionId, payload);

    if (res) {
      toast.success("Kết thúc phiên thành công!");

      setSessionData((prev) => {
        const copy = { ...prev };
        delete copy[sessionId];
        return copy;
      });
      const res2 = await getInvoiceBySessionId(res.sessionId);
      if (res2) {
        console.log("invoice", res2);
        setCurrentInvoice(res2); // lưu invoice
        setInvoiceModalOpen(true); // mở modal
      }

      getAllSession();
    }
  };

  console.log(stationBookings);

  if (stationLoading || spotsLoading || bookingsLoading) {
    return (
      <div className="text-center mt-10 text-gray-600">Đang tải dữ liệu...</div>
    );
  }

  if (stationError || spotsError || bookingsError) {
    return (
      <div className="text-center mt-10 text-red-500">
        Lỗi khi tải dữ liệu: {stationError || spotsError || bookingsError}
      </div>
    );
  }

  const handleConfirm = async () => {
    try {
      const response = confirmPaid(currentInvoice.id);
      if (response) {
        toast.success("Đã xác nhận thanh toán!");
        setInvoiceModalOpen(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(currentInvoice?.status);
  return (
    <div className="flex flex-col min-h-screen px-6">
      <Modal
        open={invoiceModalOpen}
        onCancel={() => setInvoiceModalOpen(false)}
        footer={null}
        title={
          currentInvoice?.status == "PAID"
            ? "Xác nhận thanh toán"
            : "Đã thanh toán"
        }
      >
        {currentInvoice ? (
          <div className="space-y-3">
            <p>
              <span className="font-medium">Mã hóa đơn:</span> #
              {currentInvoice.id}
            </p>

            <p>
              <span className="font-medium">Trạng thái:</span>{" "}
              <span
                className={
                  currentInvoice.status === "PAID"
                    ? "text-green-600"
                    : "text-red-500"
                }
              >
                {currentInvoice.status}
              </span>
            </p>

            <p>
              <span className="font-medium">Thời gian bắt đầu:</span>{" "}
              {dayjs(currentInvoice.session.startTime).format(
                "HH:mm DD/MM/YYYY"
              )}
            </p>

            <p>
              <span className="font-medium">Thời gian kết thúc:</span>{" "}
              {dayjs(currentInvoice.session.endTime).format("HH:mm DD/MM/YYYY")}
            </p>

            <p>
              <span className="font-medium">Công suất tiêu thụ:</span>{" "}
              {currentInvoice.session.powerOutput} kWh
            </p>

            <p className="text-lg">
              <span className="font-medium">Tổng tiền:</span>{" "}
              <span className="text-blue-600 font-semibold text-xl">
                {currentInvoice.finalCost.toLocaleString()} VNĐ
              </span>
            </p>

            <button
              onClick={handleConfirm}
              disabled={currentInvoice.status === "PAID"}
              className="bg-[#00B35C] text-white w-full py-2 rounded-lg hover:bg-[#008236] transition font-medium mt-4"
            >
              {currentInvoice.status === "PENDING"
                ? "Xác nhận thanh toán"
                : "Đã thanh toán"}
            </button>
          </div>
        ) : (
          <p>Đang tải hóa đơn...</p>
        )}
      </Modal>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        title="Bắt đầu phiên sạc thủ công"
      >
        <div className="flex flex-col gap-4">
          {/* Chọn Spot */}
          <div>
            <label className="font-medium">Chọn điểm sạc</label>
            <Select
              className="w-full mt-1"
              placeholder="Chọn Spot"
              onChange={setSelectedSpot}
            >
              {availableSpots.map((spot) => (
                <Select.Option key={spot.id} value={spot.id}>
                  Spot #{spot.id} – {spot.spotName}
                </Select.Option>
              ))}
            </Select>
          </div>

          {/* percentBefore */}
          <div>
            <p className="font-medium">
              Mức pin hiện tại:{" "}
              <span className="text-green-600">{percentBefore}%</span>
            </p>
          </div>

          {/* Rate per Kwh */}
          <div>
            <p className="font-medium">
              Giá / kWh:{" "}
              <span className="text-blue-600">{station?.pricePerKwh} VNĐ</span>
            </p>
          </div>

          {/* Battery Capacity */}
          <div>
            <label className="font-medium">Dung lượng pin (kWh)</label>
            <InputNumber
              className="w-full mt-1"
              placeholder="Nhập dung lượng pin xe"
              min={1}
              onChange={setBatteryCapacity}
            />
          </div>

          <button
            onClick={handleConfirmStart}
            className="bg-[#00B35C] text-white w-full py-2 rounded-lg hover:bg-[#008236] transition font-medium"
          >
            Start Session
          </button>
        </div>
      </Modal>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <Tabs.TabPane tab="Phiên sạc" key="sessions">
          <div className="max-w-6xl mx-auto w-full">
            {/* Station Info Section */}
            {station && (
              <div className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                  {station.name}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">
                      <span className="font-medium">Địa chỉ:</span>{" "}
                      {station.location}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Công suất:</span>{" "}
                      {station.powerCapacity} kW
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Trạng thái:</span>{" "}
                      <span
                        className={
                          station.status === "AVAILABLE"
                            ? "text-green-600"
                            : "text-red-500"
                        }
                      >
                        {station.status === "AVAILABLE"
                          ? "Đang hoạt động"
                          : "Ngưng hoạt động"}
                      </span>
                    </p>
                  </div>
                  <div className="h-40 md:h-full">
                    <img
                      src={
                        station.imageUrl ||
                        "https://greencharge.vn/wp-content/uploads/2023/04/greencharge-38.jpg"
                      }
                      alt={station.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}
            <div>
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Bắt đầu phiên sạc thủ công cho khách vãng lai
                </h2>
                <button
                  onClick={handleStartSession}
                  className="bg-[#00B35C] text-white rounded-lg hover:bg-[#008236] transition font-medium shadow-sm"
                >
                  Tạo phiên sạc thủ công
                </button>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thời gian bắt đầu
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thời gian kết thúc
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trạng thái
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filterSession?.map((session) => (
                      <tr key={session.sessionId}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{session.sessionId}
                        </td>

                        {/* Start time */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {dayjs(session.startTime).format("HH:mm DD/MM/YYYY")}
                        </td>

                        {/* End time - nếu null → hiển thị "Chưa kết thúc" */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {session.endTime
                            ? dayjs(session.endTime).format("HH:mm DD/MM/YYYY")
                            : "Chưa kết thúc"}
                        </td>

                        {/* Status + nút kết thúc nếu ACTIVE */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          {session.status === "ACTIVE" ? (
                            <button
                              onClick={() =>
                                handleEndSession(session.sessionId)
                              }
                              className="px-3 py-1 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition"
                            >
                              Kết thúc phiên
                            </button>
                          ) : (
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                session.status === "COMPLETE"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {session.status === "COMPLETE"
                                ? "Đã hoàn thành"
                                : session.status}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Bookings Section */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Lịch đặt trạm
              </h2>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thời gian bắt đầu
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thời gian kết thúc
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trạng thái
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {stationBookings.map((booking) => (
                      <tr key={booking.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{booking.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {dayjs(booking.timeToCharge).format(
                            "HH:mm DD/MM/YYYY"
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {dayjs(booking.endTime).format("HH:mm DD/MM/YYYY")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              booking.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-800"
                                : booking.status === "CONFIRMED"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {booking.status === "PENDING"
                              ? "Chờ thanh toán"
                              : booking.status === "CONFIRMED"
                              ? "Đã xác nhận"
                              : booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Nội dung các session hiện tại (giữ nguyên table cũ) */}
        </Tabs.TabPane>

        <Tabs.TabPane tab="Hóa đơn" key="invoices">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày tạo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tổng tiền
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoices?.map((inv) => (
                  <tr key={inv.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{inv.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {dayjs(inv.issueDate).format("HH:mm DD/MM/YYYY")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {inv.finalCost.toLocaleString()} VNĐ
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={
                          inv.status === "PAID"
                            ? "text-green-600"
                            : "text-red-500"
                        }
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => {
                          setCurrentInvoice(inv);
                          setInvoiceModalOpen(true);
                        }}
                        className="px-3 py-1 rounded-lg bg-blue-500 text-white text-xs font-semibold hover:bg-blue-600 transition"
                      >
                        Xem hóa đơn
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default StationSpot;
