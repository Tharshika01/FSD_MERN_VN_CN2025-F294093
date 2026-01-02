import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        role
      });

      alert("Registration Successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Your Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          <select
            style={styles.input}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="seller">Seller</option>
             <option value="admin">Admin</option>
          </select>

          <button style={styles.button}>Create Account</button>
        </form>

        <p style={styles.loginText}>
          Already have an account?{" "}
          <span
            style={styles.loginLink}
            onClick={() => navigate("/login")}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "white", // plain background like login page
  },
  card: {
    width: "450px",
    padding: "40px",
    borderRadius: "15px",
    background: "#270416ff", // dark card for contrast
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    backdropFilter: "blur(10px)",
    textAlign: "center",
    color: "white",
    border: "1px solid rgba(255,255,255,0.2)",
  },
  title: {
    marginBottom: "30px",
    fontSize: "26px",
    fontWeight: "600",
  },
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
  loginText: {
    marginTop: "18px",
    fontSize: "16px",
  },
  loginLink: {
    color: "#de5eadff",
    fontWeight: "600",
    cursor: "pointer",
  },
};
