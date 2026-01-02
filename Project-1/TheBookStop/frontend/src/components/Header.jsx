import { Link } from "react-router-dom";

export default function Header() {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg px-4 py-3 shadow-sm"
      style={{
        background: "linear-gradient(135deg, #270416ff, #3b0a2eff)"

      }}
    >
      <Link className="navbar-brand fw-bold fs-4" to="/">
  <span style={{ color: "#f5e6ff" }}>🪶</span>{" "}
  <span style={{ letterSpacing: "1px", color: "#f8d9ff" }}>
    The<span style={{ color: "#ffffff" }}>Book</span>Stop
  </span>
</Link>

      <button
        className="navbar-toggler text-light"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav ms-auto align-items-center gap-2">

          {/* COMMON */}
          <li className="nav-item">
            <Link className="nav-link text-light" to="/">Home</Link>
          </li>

          {/* USER */}
          {role === "user" && token && (
            <>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/cart">Cart</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/wishlist">Wishlist</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/orders">Orders</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/profile">Profile</Link>
              </li>
            </>
          )}

          {/* SELLER */}
          {role === "seller" && token && (
            <li className="nav-item">
              <Link className="nav-link text-light" to="/seller/dashboard">
                Seller Dashboard
              </Link>
            </li>
          )}

          {/* ADMIN */}
          {role === "admin" && token && (
            <li className="nav-item">
              <Link className="nav-link text-light" to="/admin/dashboard">
                Admin Panel
              </Link>
            </li>
          )}

          {/* AUTH */}
          {!token && (
            <>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-outline-light px-3" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}

          {/* LOGOUT */}
          {token && (
            <li className="nav-item">
  <button
    className="btn ms-2 px-3 text-white"
    style={{
      background: "linear-gradient(135deg, #4a1240, #6a1b5a)",
      border: "none",
    }}
    onClick={logout}
  >
    Logout
  </button>
</li>

          )}
        </ul>
      </div>
    </nav>
  );
}
