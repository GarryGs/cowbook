import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CowForm.css";

const CowForm = ({ cowData, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    serial_no: "",
    dob: "",
    no_of_calf: "",
    breed: "",
    weight: "",
    health: "Healthy",
  });

  useEffect(() => {
    if (cowData) {
      setFormData({
        serial_no: cowData.serial_no || "",
        dob: cowData.DOB ? cowData.dob.split("T")[0] : "",
        no_of_calf: Number(cowData.no_of_calf) || 0,
        breed: cowData.breed || "",
        weight: Number(cowData.weight) || 0,
        health: cowData.health || "Healthy",
      });
    }
  }, [cowData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (cowData) {
        await axios.put(`http://localhost:5000/api/cows/${cowData._id}`, formData);
      } else {
        await axios.post("http://localhost:5000/api/cows", formData);
      }

      if (typeof onSuccess === "function") onSuccess();
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  };

  return (
    <form className="cow-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="cow-attr">
          <label>Serial No:</label>
          <input type="text" name="serial_no" value={formData.serial_no} onChange={handleChange} required />
        </div>

        <div className="cow-attr">
          <label>Date of Birth:</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        </div>

        <div className="cow-attr">
          <label>No. of Calves:</label>
          <input type="number" name="no_of_calf" value={formData.no_of_calf} onChange={handleChange} required />
        </div>

        <div className="cow-attr">
          <label>Breed:</label>
          <input type="text" name="breed" value={formData.breed} onChange={handleChange} placeholder="e.g. Gir, Sahiwal" />
        </div>

        <div className="cow-attr">
          <label>Weight (kg):</label>
          <input type="number" name="weight" value={formData.weight} onChange={handleChange} />
        </div>

        <div className="cow-attr">
          <label>Health Status:</label>
          <select name="health" value={formData.health} onChange={handleChange}>
            <option value="Healthy">Healthy</option>
            <option value="Under Treatment">Under Treatment</option>
            <option value="Sick">Sick</option>
          </select>
        </div>
      </div>

      <div className="button-section">
        <button type="submit" className="save-btn">
          {cowData ? "Update Cow" : "Add Cow"}
        </button>
        {onCancel && (
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default CowForm;
