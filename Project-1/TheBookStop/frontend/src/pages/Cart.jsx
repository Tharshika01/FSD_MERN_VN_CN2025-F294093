import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadCart = async () => {
    try {
      const res = await API.get("/cart");
      setItems(res.data || []);
    } catch (err) {
      console.log("Cart Error", err);

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (id) => {
    try {
      await API.delete(`/cart/${id}`);
      loadCart();
    } catch (err) {
      console.log("Remove Error", err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>My Cart 🛒</h2>

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Empty */}
      {!loading && items.length === 0 && <p>Your cart is empty.</p>}

      {/* Items */}
      {!loading &&
        items.map((item) =>
          item?.book ? (
            <div key={item._id} className="card shadow-sm p-3 mb-3">
              <div
                className="d-flex align-items-center"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/book/${item.book._id}`)}
              >
                <img
                  src={`http://localhost:5000${item.book.image}`}
                  width="80"
                  height="110"
                  style={{ objectFit: "cover", borderRadius: "5px" }}
                />

                <div className="ms-3">
                  <h6 className="fw-bold">{item.book.title}</h6>
                  <p className="text-muted">{item.book.author}</p>
                  <strong>₹{item.book.price}</strong>
                </div>

            <button
  className="btn ms-auto text-white"
  style={{
    background: "linear-gradient(135deg, #4a1240, #6a1b5a)",
    border: "none"
  }}
  onClick={(e) => {
    e.stopPropagation();
    removeItem(item._id);
  }}
>
  Remove
</button>

              </div>
            </div>
          ) : null
        )}
    </div>
  );
}
