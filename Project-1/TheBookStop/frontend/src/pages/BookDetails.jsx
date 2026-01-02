import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const addToCart = async () => {
    try {
      await API.post("/cart/add", { bookId: book._id });
      alert("Added to cart 🛒");
    } catch (err) {
      alert("Failed to add");
    }
  };

  const buyNow = async () => {
    if (!localStorage.getItem("token")) {
      alert("Login to continue purchase");
      return;
    }

    try {
      await API.post("/orders/create", {
        bookId: book._id,
        price: book.price
      });

      window.location.href = "/payment";

    } catch (err) {
      alert("Payment Failed");
    }
  };

  const addToWishlist = async () => {
    try {
      await API.post("/wishlist/add", { bookId: book._id });
      alert("Added to wishlist ");
    } catch (err) {
      alert("Failed to add");
    }
  };

  const loadBook = async () => {
    const res = await API.get(`/books/${id}`);
    setBook(res.data);
  };

  const loadReviews = async () => {
    const res = await API.get(`/reviews/${id}`);
    setReviews(res.data);
  };

  const submitReview = async () => {
    try {
      await API.post(`/reviews/${id}`, {
        rating: Number(rating),
        comment
      });

      alert("Review added");
      setRating(5);
      setComment("");
      loadReviews();
    } catch {
      alert("Failed to submit review");
    }
  };

  useEffect(() => {
    loadBook();
    loadReviews();
  }, [id]);   // <-- IMPORTANT FIX

  if (!book) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container mt-5">

      <div className="row">

        {/* LEFT IMAGE */}
        <div className="col-md-4 text-center">
          <img
            src={`http://localhost:5000${book.image}`}
            alt={book.title}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "420px", objectFit: "cover" }}
          />
        </div>

        {/* RIGHT DETAILS */}
        <div className="col-md-8">

          <h2 className="fw-bold">{book.title}</h2>
          <h5 className="text-muted">By {book.author}</h5>

          <p className="mt-2"><b>Genre:</b> {book.genre}</p>

          <h3 className="text-success fw-bold">₹{book.price}</h3>

          {/* BUTTONS */}
          <div className="mt-3 d-flex gap-3">
            <button className="btn btn-primary me-2" onClick={addToCart}>
              Add to Cart
            </button>

            <button className="btn btn-warning me-2" onClick={buyNow}>
               Buy Now
            </button>

            <button className="btn btn-light" onClick={addToWishlist}>
               Wishlist
            </button>

          </div>

          <hr className="my-4" />

          {/* DESCRIPTION */}
          <h4 className="fw-bold">Book Description</h4>
          <p style={{ fontSize: "17px", lineHeight: "28px" }}>
            {book.description || "No description provided"}
          </p>
        </div>
      </div>


      {/* ================= Reviews ================= */}
      <hr className="mt-5" />
      <h3 className="fw-bold">Customer Reviews</h3>

      {reviews.length === 0 && <p>No reviews yet.</p>}

      {reviews.map(r => (
        <div key={r._id} className="border rounded p-3 mb-2">
          <b>{r.name || "User"}</b>
          <span className="text-warning ms-2">
            ⭐ {r.rating}
          </span>

          <p className="mt-2">{r.comment}</p>
        </div>
      ))}

      {/* ================= Add Review ================= */}
      <div className="mt-4">
        <h4>Add Review</h4>

        <select
          className="form-control mb-2"
          value={rating}
          onChange={e => setRating(e.target.value)}
        >
          <option value="5">5 - Excellent ⭐⭐⭐⭐⭐</option>
          <option value="4">4 - Good ⭐⭐⭐⭐</option>
          <option value="3">3 - Average ⭐⭐⭐</option>
          <option value="2">2 - Poor ⭐⭐</option>
          <option value="1">1 - Bad ⭐</option>
        </select>

        <textarea
          className="form-control mb-2"
          placeholder="Write review here..."
          value={comment}
          onChange={e => setComment(e.target.value)}
        />

        <button className="btn btn-success" onClick={submitReview}>
          Submit Review
        </button>
      </div>
    </div>
  );
}
