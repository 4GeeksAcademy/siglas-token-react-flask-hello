import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("access_token");
    navigate("/login");
  }, [navigate]);

  return (
    <div className="container text-center mt-5">
      <div className="spinner-border"></div>
      <p className="mt-3">Cerrando sesión...</p>
    </div>
  );
};

export default Logout;
