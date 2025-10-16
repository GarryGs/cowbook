import "./CowTable.css";
import axios from "axios";

function CowTable({ cows, onDelete, onEdit }) {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this cow?")) {
      await axios.delete(`http://localhost:5000/api/cows/${id}`);
      onDelete(id);
    }
  };

  return (
    <table className="cow-table">
      <thead>
        <tr>
          <th>Serial No</th>
          <th>DOB</th>
          <th>Calfs</th>
          <th>Breed</th>
          <th>Gender</th>
          <th>Weight (kg)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {cows.map(cow => (
          <tr key={cow._id}>
            <td>{cow.serial_no}</td>
            <td>{cow.DOB}</td>
            <td>{cow.no_of_calf}</td>
            <td>{cow.breed}</td>
            <td>{cow.gender}</td>
            <td>{cow.weight}</td>
            <td>
              <button className="edit-btn" onClick={() => onEdit(cow)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(cow._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CowTable;
