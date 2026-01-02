import { useEffect, useState } from "react";
import API from "../services/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: ""
  });

  const loadProfile = async () => {
    const res = await API.get("/profile/me");
    setUser(res.data);

    setForm({
      name: res.data.name || "",
      phone: res.data.phone || "",
      street: res.data.address?.street || "",
      city: res.data.address?.city || "",
      state: res.data.address?.state || "",
      pincode: res.data.address?.pincode || "",
    });
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const updateProfile = async () => {
    await API.put("/profile/update", form);
    alert("Profile Updated");
    setEdit(false);
    loadProfile();
  };

  if (!user) return <h3 style={{ marginTop: "5rem", textAlign: "center" }}>Loading...</h3>;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>My Profile</h2>

        {!edit && (
          <div style={styles.content}>
            <h5>Name: {user.name}</h5>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone || "Not Added"}</p>

            <h5 style={{ marginTop: "1rem" }}>Address:</h5>

            {user.address ? (
              <>
                <p>{user.address.street}</p>
                <p>{user.address.city}, {user.address.state}</p>
                <p>{user.address.pincode}</p>
              </>
            ) : (
              <p>No Address Added</p>
            )}

            <button
              style={styles.button}
              onClick={() => setEdit(true)}
            >
              {user.address ? "Edit Profile" : "Add Address"}
            </button>
          </div>
        )}

        {edit && (
          <div style={styles.content}>
            <h4>Edit Profile</h4>

            {["name","phone","street","city","state","pincode"].map(field => (
              <input
                key={field}
                style={styles.input}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={e => setForm({...form, [field]: e.target.value})}
              />
            ))}

            <div style={{ marginTop: "10px" }}>
              <button style={{ ...styles.button, background: "#450d23ff", marginRight: "10px" }} onClick={updateProfile}>
                Save
              </button>
              <button style={{ ...styles.button, background: "#6c757d" }} onClick={() => setEdit(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#a8a2a7ff", // light background
  },
  card: {
    width: "400px",
    padding: "30px",
    borderRadius: "20px",
    background: "rgba(223, 202, 213, 0.8)", // glass effect
    boxShadow: "0 8px 32px rgba(42, 8, 19, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.3)",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
  },
  content: {
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid rgba(0,0,0,0.2)",
    background: "rgba(255,255,255,0.6)",
  },
  button: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    background: "#6a174aff",
    color: "white",
    cursor: "pointer",
  }
};
