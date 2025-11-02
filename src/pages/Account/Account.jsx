import React from "react";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Tài khoản của bạn</h2>
      <p>Xin chào! Đây là trang thông tin tài khoản của bạn.</p>

      <button
        onClick={() => navigate("/chargingSession")}
        style={{
          marginTop: "20px",
          backgroundColor: "#1677ff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          padding: "10px 16px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        ⚡ Đặt chỗ của bạn
      </button>
    </div>
  );
};

export default Account;
