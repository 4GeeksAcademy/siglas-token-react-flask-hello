import { Link } from "react-router-dom";

export const Navbar = () => {

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">JWT</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end pe-1" id="navbarNavAltMarkup">
            <div className="navbar-nav ">
              <Link to="/">
                <span className="nav-link active" aria-current="page" href="#">Home</span>
              </Link>
              <Link to="/registrarse">
                <span className="nav-link active" aria-current="page" href="#">Registrarse</span>
              </Link>
              <Link to="/login">
                <span className="nav-link active" aria-current="page" href="#">Login</span>
              </Link>
              <Link to="/logout">
                <span className="nav-link active" aria-current="page" href="#">Logout</span>
              </Link>
              <Link to="/usuarios">
                <span className="nav-link active" aria-current="page" href="#">Usuarios</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};