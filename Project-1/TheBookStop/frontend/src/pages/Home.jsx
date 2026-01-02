import { useEffect, useState } from "react";
import API from "../services/api";
import Hero from "../components/Hero";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(8);  


  useEffect(() => {
    API.get("/books").then(res => setBooks(res.data));
  }, []);

  const buyNow = async (book) => {
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

  const addToCart = async (book) => {
    try {
      await API.post("/cart/add", { bookId: book._id });
      alert("Added to cart 🛒");
    } catch (err) {
      alert("Failed to add to cart");
    }
  };

  const addToWishlist = async (book) => {
    try {
      await API.post("/wishlist/add", { bookId: book._id });
      alert("Added to wishlist ");
    } catch (err) {
      alert("Failed to add");
    }
  };

  return (
    <>
      <Hero />

      <div className="container mt-5" id="bestSellerSection">
        
        <h3 className="fw-bold mb-3">Books</h3>

        {/* 🔍 Search Bar */}
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search by book title, author or genre"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="row">
          {books
            .filter(b =>
              b.title.toLowerCase().includes(search.toLowerCase()) ||
              b.author.toLowerCase().includes(search.toLowerCase()) ||
              (b.genre?.toLowerCase().includes(search.toLowerCase()))
            )
            .slice(0, visible)
            .map(book => (
              <div className="col-md-3 mb-4" key={book._id}>
                <div className="book-card shadow-sm p-3 text-center">

                  <img
                    src={`http://localhost:5000${book.image}`}
                    alt={book.title}
                    className="book-image"
                    style={{ cursor: "pointer" }}
                    onClick={() => window.location.href = `/book/${book._id}`}
                  />

                  <h6 className="mt-2 fw-bold">{book.title}</h6>
                  <p className="text-muted">{book.author}</p>
                  <strong>₹{book.price}</strong>

                  <div className="book-actions">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => addToCart(book)}
                    >
                      🛒 Add to Cart
                    </button>

                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => buyNow(book)}
                    >
                       Buy Now
                    </button>

                    <button
                      className="btn btn-light btn-sm"
                      onClick={() => addToWishlist(book)}
                    >
                      
                    </button>
                  </div>

                </div>
              </div>
            ))}
            
        </div>
        {visible < books.length && (
  <div className="text-center mt-3">
    <button
      className="btn btn-dark"
      onClick={() => setVisible(prev => prev + 8)}
    >
      Load More ⬇️
    </button>
  </div>
)}
      </div>
    </>
  );
}
