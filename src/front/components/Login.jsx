import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        const token = localStorage.getItem("access_token");

        if (token) {
            setError("Ya estás logueado, redirigiendo...");

            const timer = setTimeout(() => {
                navigate("/", { replace: true });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await fetch("https://miniature-space-broccoli-r4v45vj4555rcwxqg-3001.app.github.dev/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log("data", data)

            if (!data.ok) {
                setError(data.message || "Credenciales inválidas");
                setTimeout(() => {
                    setError(""); // Limpia el mensaje de error
                    setFormData({
                        email: "",
                        password: "",
                    })
                }, 3000);

                return;
            }
            localStorage.setItem("access_token", data.access_token)
            navigate("/")
        } catch {
            setError("Error de conexión con el servidor");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container min-vh-100 d-flex align-items-center justify-content-center">
            <div className="row w-100 justify-content-center">
                <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
                    <div className="card shadow">
                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>
                                <h4 className="text-center mb-4">Iniciar sesión</h4>

                                {error && (
                                    <div className="alert alert-danger text-center">
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        {error}
                                    </div>
                                )}

                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Contraseña</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                            Ingresando...
                                        </>
                                    ) : (
                                        "Ingresar"
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
