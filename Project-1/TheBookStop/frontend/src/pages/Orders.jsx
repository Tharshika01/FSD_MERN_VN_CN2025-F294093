import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const loadOrders = async () => {
    try {
      const res = await API.get("/orders/my");
      setOrders(res.data || []);
    } catch {
      alert("Failed to load orders");
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-4">My Orders </h2>

      {orders.length === 0 && <p>No orders yet.</p>}

      {orders.map(order => (
        <div key={order._id} className="border rounded p-3 mb-3">

          <h6>Order ID: {order._id}</h6>
          <p>Status: <b>{order.status}</b></p>

          <h6>Items:</h6>

          {order.items?.map(item =>
            item?.book ? (
              <div
                key={item._id}
                className="d-flex align-items-center mb-2 p-2 border rounded"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/book/${item.book._id}`)}
              >
                <img
                  src={`http://localhost:5000${item.book.image}`}
                  alt={item.book.title}
                  style={{
                    width: "70px",
                    height: "90px",
                    objectFit: "cover",
                    borderRadius: "5px",
                    marginRight: "10px"
                  }}
                />

                <div>
                  <strong>{item.book.title}</strong>
                  <p className="m-0 text-muted">
                    ₹{item.book.price}
                  </p>
                </div>
              </div>
            ) : null
          )}

          <p className="mt-2">
            <b>Total:</b> ₹{order.totalAmount || "N/A"}
          </p>
        </div>
      ))}
    </div>
  );
}
