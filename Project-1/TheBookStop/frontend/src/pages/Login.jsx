import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name);

      if (res.data.role === "admin") navigate("/admin/dashboard");
      else if (res.data.role === "seller") navigate("/seller/dashboard");
      else navigate("/");
    } catch {
      alert("Invalid email or password");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Log In</h2>

        <form onSubmit={handleLogin}>
          <input
            style={styles.input}
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            style={styles.input}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div style={styles.row}>
            <div>
              <input type="checkbox" /> Remember me
            </div>
          </div>

          <button style={styles.button}>Log In</button>
        </form>

        <div className="text-center mt-3">
          <span>Don’t have an account? </span>
          <span
            style={styles.signupLink}
            onClick={() => navigate("/register")}
          >
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "white", // changed from gradient to plain white
  },
  card: {
    width: "400px",
    padding: "40px",
    borderRadius: "15px",
    background: "#270416ff", // dark card to contrast with white background
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    textAlign: "center",
    color: "white",
    border: "1px solid rgba(255,255,255,0.2)",
  },
  title: { marginBottom: "30px", fontSize: "28px", fontWeight: "600" },
  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.3)",
    background: "rgba(255,255,255,0.1)",
    color: "white",
  },
  button: {
    width: "100%",
    padding: "14px",
    background: "#9c27b0",
    color: "white",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
    color: "white",
  },
  signupLink: {
    color: "#ff3bc1ff",
    fontWeight: "600",
    cursor: "pointer",
  },
};
