import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadWishlist = async () => {
    try {
      const res = await API.get("/wishlist");
      setList(res.data || []);
    } catch (err) {
      console.log("Wishlist Error", err);

      // If user token expired → logout
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const removeWishlist = async (id) => {
    try {
      await API.delete(`/wishlist/${id}`);
      loadWishlist();
    } catch (err) {
      console.log("Remove Error", err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>My Wishlist </h2>

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Empty */}
      {!loading && list.length === 0 && <p>No items in wishlist.</p>}

      {/* Items */}
      {!loading &&
        list.map((w) =>
          w?.book ? (
            <div key={w._id} className="card shadow-sm p-3 mb-3">
              <div
                className="d-flex align-items-center"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/book/${w.book._id}`)}
              >
                <img
                  src={`http://localhost:5000${w.book.image}`}
                  width="80"
                  height="110"
                  style={{ objectFit: "cover", borderRadius: "5px" }}
                />

                <div className="ms-3">
                  <h6 className="fw-bold">{w.book.title}</h6>
                  <p className="text-muted">{w.book.author}</p>
                  <strong>₹{w.book.price}</strong>
                </div>

                <button
                  className="btn btn-danger ms-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeWishlist(w._id);
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
