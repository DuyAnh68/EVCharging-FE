import React from "react";

const ModelCar = ({ imageUrl, modelName }) => {
  // fallback nếu không có ảnh
  const fallbackImage = "https://via.placeholder.com/400x250?text=No+Image";

  return (
      <img
        src={imageUrl || fallbackImage}
        alt={modelName || "Xe điện"}
        style={{ objectFit: "cover" }}
        onError={(e) => (e.target.src = fallbackImage)}
      />

  );
};

export default ModelCar;
