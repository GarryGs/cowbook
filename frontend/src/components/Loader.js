// src/components/Loader.js
import React from "react";

const Loader = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0.5rem"
    }}>
      <div className="spinner"></div>
      <style>
        {`
        .spinner {
          border: 2px solid rgba(0,0,0,0.1);
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border-left-color: #09f;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        `}
      </style>
    </div>
  );
};

export default Loader;
