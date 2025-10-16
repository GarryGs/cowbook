import React, { useEffect, useState } from "react";
import axios from "axios";
import CowForm from "../components/CowForm";
import "./AllCows.css";

const AllCows = () => {
  const [cows, setCows] = useState([]);
  const [editingCow, setEditingCow] = useState(null);

  const fetchCows = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cows");
      setCows(res.data);
    } catch (err) {
      console.error("Error fetching cows:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this cow?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/cows/${id}`);
      fetchCows();
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  };

  const handleEdit = (cow) => setEditingCow(cow);

  const handleUpdateSuccess = () => {
    setEditingCow(null);
    fetchCows();
  };

  useEffect(() => {
    fetchCows();
  }, []);

  return (
    <div className="allcows-container">
      <h1 className="title">🐄 All Farm Cows</h1>

      {editingCow ? (
        <div className="edit-section">
          <h2>Edit Cow Details</h2>
          <CowForm
            cowData={editingCow}
            onSuccess={handleUpdateSuccess}
            onCancel={() => setEditingCow(null)}
          />
        </div>
      ) : (
        <div className="cow-grid">
          {cows.length === 0 ? (
            <p className="empty-message">No cows found. Add one to get started!</p>
          ) : (
            cows.map((cow) => (
              <div key={cow._id} className="cow-card">
                <h3>Serial No: {cow.serial_no}</h3>
                <p><strong>Date of Birth:</strong> {new Date(cow.DOB).toLocaleDateString()}</p>
                <p><strong>No. of Calves:</strong> {cow.no_of_calf}</p>
                <p><strong>Breed:</strong> {cow.breed || "N/A"}</p>
                <p><strong>Weight:</strong> {cow.weight || "N/A"} kg</p>
                <p><strong>Health Status:</strong> {cow.health || "Good"}</p>

                <div className="button-row">
                  <button className="edit-btn" onClick={() => handleEdit(cow)}>✏️ Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(cow._id)}>🗑️ Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AllCows;
