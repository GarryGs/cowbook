import CowForm from "../components/CowForm";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/allcows");
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px", fontFamily: 'Segoe UI' }}>Add New Cow</h1>
      <CowForm onSuccess={handleSuccess} />
    </div>
  );
}

export default Home;
