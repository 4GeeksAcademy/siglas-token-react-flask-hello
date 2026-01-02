import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Registrarse = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    is_active : true,
  });

  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({
    show: false,
    type: "",
    message: "",
  });

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });

    setTimeout(() => {
      setAlert({ show: false, type: "", message: "" });
    }, 5000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showAlert("danger", "Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://miniature-space-broccoli-r4v45vj4555rcwxqg-3001.app.github.dev/api/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            is_active : true,
          }),
        }
      );

      const data = await response.json();
      console.log(data)
       if (!data.ok) {
        showAlert("danger", data?.message || "Error al registrar usuario");
        setLoading(false);
        return;
      }
 
      showAlert("success", "Usuario registrado correctamente");

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        is_active : "True",
      });
      navigate("/login")

    } catch (error) {
      showAlert("danger", "Error de red. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center px-3">
      <div className="card shadow w-100" style={{ maxWidth: "420px" }}>

        {alert.show && (
          <div
            className={`alert alert-${alert.type} alert-dismissible fade show mb-0 rounded-top`}
            role="alert"
          >
            {alert.message}
            <button
              type="button"
              className="btn-close"
              onClick={() => setAlert({ ...alert, show: false })}
            ></button>
          </div>
        )}

        <div className="card-body p-4">
          <h3 className="text-center mb-4">Registro</h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Confirmar Contraseña</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 d-flex justify-content-center align-items-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  Registrando...
                </>
              ) : (
                "Registrarse"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registrarse;
