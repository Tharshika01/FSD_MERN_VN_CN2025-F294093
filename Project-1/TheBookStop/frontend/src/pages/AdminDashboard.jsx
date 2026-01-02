import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminDashboard() {
  const [tab, setTab] = useState("dashboard");

  const [stats, setStats] = useState({
    users: 0,
    sellers: 0,
    books: 0,
    orders: 0
  });

  const [users, setUsers] = useState([]);
  const [sellers, setSellers] = useState([]);

  // ===== LOAD STATS =====
  const loadStats = async () => {
    const res = await API.get("/admin/stats");
    setStats(res.data);
  };

  // ===== LOAD USERS =====
  const loadUsers = async () => {
    const res = await API.get("/admin/users");
    setUsers(res.data);
  };

  // ===== LOAD SELLERS =====
  const loadSellers = async () => {
    const res = await API.get("/admin/sellers");
    setSellers(res.data);
  };

  useEffect(() => {
    loadStats();
  }, []);

// ===== BLOCK / UNBLOCK USER =====
const toggleUserStatus = async (id, status) => {
  await API.put(`/admin/${status}/${id}`);
  loadUsers();
};

// ===== DELETE USER =====
const deleteUser = async (id) => {
  if (!window.confirm("Delete this user?")) return;
  await API.delete(`/admin/delete/${id}`);
  loadUsers();
};

// ===== BLOCK / UNBLOCK SELLER =====
const toggleSellerStatus = async (id, status) => {
  await API.put(`/admin/${status}/${id}`);
  loadSellers();
};

// ===== DELETE SELLER =====
const deleteSeller = async (id) => {
  if (!window.confirm("Delete this seller?")) return;
  await API.delete(`/admin/delete/${id}`);
  loadSellers();
};


  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-4">Admin Dashboard</h2>

      {/* NAV BUTTONS */}
      <div className="mb-4">
        <button className="btn btn-dark me-2" onClick={() => setTab("dashboard")}>
          Dashboard
        </button>

        <button className="btn btn-primary me-2" onClick={() => {
          setTab("users");
          loadUsers();
        }}>
          Manage Users
        </button>

        <button className="btn btn-warning" onClick={() => {
          setTab("sellers");
          loadSellers();
        }}>
          Manage Sellers
        </button>
      </div>

      {/* ================= DASHBOARD ================= */}
      {tab === "dashboard" && (
        <div className="row">
          <div className="col-md-3">
            <div className="p-4 text-white rounded" style={{ background:"#007BFF" }}>
              <h4>Users</h4>
              <h1>{stats.users}</h1>
            </div>
          </div>

          <div className="col-md-3">
            <div className="p-4 text-white rounded" style={{ background:"#FFC107" }}>
              <h4>Sellers</h4>
              <h1>{stats.sellers}</h1>
            </div>
          </div>

          <div className="col-md-3">
            <div className="p-4 text-white rounded" style={{ background:"#28A745" }}>
              <h4>Books</h4>
              <h1>{stats.books}</h1>
            </div>
          </div>

          <div className="col-md-3">
            <div className="p-4 text-white rounded" style={{ background:"#DC3545" }}>
              <h4>Orders</h4>
              <h1>{stats.orders}</h1>
            </div>
          </div>
        </div>
      )}

      {/* ================= MANAGE USERS ================= */}
      {tab === "users" && (
        <>
          <h4 className="mt-3">Manage Users ({users.length})</h4>

          {users.map(u => (
            <div key={u._id} className="border p-2 mb-2">
              <b>{u.name}</b> — {u.email}

              <span className="ms-3 badge bg-secondary">
                {u.isBlocked ? "Blocked" : "Active"}
              </span>

              <button
                className={`btn btn-sm ms-2 ${u.isBlocked ? "btn-success" : "btn-warning"}`}
                onClick={() => toggleUserStatus(u._id, u.isBlocked ? "unblock" : "block")}
              >
                {u.isBlocked ? "Unblock" : "Block"}
              </button>

              <button
                className="btn btn-danger btn-sm float-end"
                onClick={() => deleteUser(u._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </>
      )}

      {/* ================= MANAGE SELLERS ================= */}
      {tab === "sellers" && (
        <>
          <h4 className="mt-3">Manage Sellers ({sellers.length})</h4>

          {sellers.map(s => (
            <div key={s._id} className="border p-2 mb-2">
              <b>{s.name}</b> — {s.email}

              <span className="ms-3 badge bg-secondary">
                {s.isBlocked ? "Blocked" : "Active"}
              </span>

              <button
                className={`btn btn-sm ms-2 ${s.isBlocked ? "btn-success" : "btn-warning"}`}
                onClick={() => toggleSellerStatus(s._id, s.isBlocked ? "unblock" : "block")}
              >
                {s.isBlocked ? "Unblock" : "Block"}
              </button>

              <button
                className="btn btn-danger btn-sm float-end"
                onClick={() => deleteSeller(s._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
