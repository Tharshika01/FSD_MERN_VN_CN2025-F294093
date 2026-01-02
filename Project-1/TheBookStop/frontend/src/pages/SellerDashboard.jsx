import { useEffect, useState } from "react";
import API from "../services/api";

export default function SellerDashboard() {
  const [stats, setStats] = useState({ totalBooks: 0, totalOrders: 0 });
  const [books, setBooks] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [form, setForm] = useState({ title: "", author: "", genre: "", price: "" });
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [editingBook, setEditingBook] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", author: "", genre: "", price: "", description: "" });
  const [editImage, setEditImage] = useState(null);

  const loadStats = async () => {
    try {
      const res = await API.get("/seller/stats");
      setStats(res.data || { totalBooks: 0, totalOrders: 0 });
    } catch (err) {
      console.log("Stats Error:", err?.response?.data || err);
    }
  };

  const loadBooks = async () => {
    try {
      const res = await API.get("/books/my-books");
      setBooks(res.data || []);
    } catch (err) {
      console.log("My Books Error:", err?.response?.data || err);
    }
  };

  useEffect(() => {
    loadStats();
    loadBooks();
  }, []);

  const addBook = async () => {
    if (!form.title || !form.author || !form.genre || !form.price || !description || !image) {
      alert("Please fill all fields and upload image");
      return;
    }
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("author", form.author);
      fd.append("genre", form.genre);
      fd.append("price", form.price);
      fd.append("description", description);
      fd.append("image", image);

      await API.post("/books/create", fd, { headers: { "Content-Type": "multipart/form-data" } });

      alert("Book Added Successfully");
      setForm({ title: "", author: "", genre: "", price: "" });
      setDescription("");
      setImage(null);
      loadBooks();
      loadStats();
    } catch (err) {
      alert(err?.response?.data?.message || "Add Book Failed");
    }
  };

  const deleteBook = async (id) => {
    try {
      await API.delete(`/books/${id}`);
      alert("Book deleted");
      loadBooks();
      loadStats();
    } catch {
      alert("Delete Failed");
    }
  };

  const updateBook = async () => {
    try {
      const fd = new FormData();
      fd.append("title", editForm.title);
      fd.append("author", editForm.author);
      fd.append("genre", editForm.genre);
      fd.append("price", editForm.price);
      fd.append("description", editForm.description);
      if (editImage) fd.append("image", editImage);

      await API.put(`/books/${editingBook._id}`, fd, { headers: { "Content-Type": "multipart/form-data" } });

      alert("Book Updated Successfully");
      setEditingBook(null);
      loadBooks();
    } catch {
      alert("Update Failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-4" style={{ color: "#53122cff", textShadow: "1px 1px 4px rgba(0,0,0,0.5)" }}>
        Seller Dashboard
      </h2>

      {/* ----------- STATS ----------- */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div
            className="p-4 rounded shadow text-center"
            style={{
              background: "linear-gradient(135deg, #cd91c2ff, #6a1b5a)",
              color: "white",
              boxShadow: "0 6px 15px rgba(106,27,90,0.5)"
            }}
          >
            <h4>Items</h4>
            <h1>{stats.totalBooks}</h1>
          </div>
        </div>

        <div className="col-md-6">
          <div
            className="p-4 rounded shadow text-center"
            style={{
              background: "linear-gradient(135deg, #642d59ff, #8e2a6d)",
              color: "white",
              boxShadow: "0 6px 15px rgba(106,27,90,0.5)"
            }}
          >
            <h4>Total Orders</h4>
            <h1>{stats.totalOrders}</h1>
          </div>
        </div>
      </div>

      {/* ----------- ACTION BUTTONS ----------- */}
      <button
        className="btn me-3 mb-3"
        style={{
          background: "linear-gradient(135deg, #4a1240, #6a1b5a)",
          color: "white",
          border: "none",
          padding: "10px 25px",
          borderRadius: "8px",
          fontWeight: "bold"
        }}
        onClick={() => { setShowAdd(true); setShowDelete(false); }}
      >
        ➕ Add Book
      </button>

      <button
        className="btn mb-3"
        style={{
          background: "linear-gradient(135deg, #6a1b5a, #8e2a6d)",
          color: "white",
          border: "none",
          padding: "10px 25px",
          borderRadius: "8px",
          fontWeight: "bold"
        }}
        onClick={() => { setShowDelete(true); setShowAdd(false); }}
      >
        🗑 Manage / Edit / Delete
      </button>

      {/* ----------- ADD BOOK SECTION ----------- */}
      {showAdd && (
        <div className="mt-4 p-4 rounded shadow" style={{ background: "#4a1240", color: "white" }}>
          <h4>Add Book</h4>
          <input className="form-control mb-2" placeholder="Title"
            value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <input className="form-control mb-2" placeholder="Author"
            value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} />
          <input className="form-control mb-2" placeholder="Genre"
            value={form.genre} onChange={e => setForm({ ...form, genre: e.target.value })} />
          <input className="form-control mb-2" placeholder="Price"
            value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
          <textarea className="form-control mb-2"
            placeholder="Enter Description" value={description}
            onChange={(e) => setDescription(e.target.value)} />
          <input type="file" className="form-control mb-3"
            onChange={(e) => setImage(e.target.files[0])} />
          <button className="btn w-100" style={{ background: "linear-gradient(135deg, #6a1b5a, #8e2a6d)", color: "white", fontWeight: "bold" }} onClick={addBook}>
            Add Book
          </button>
        </div>
      )}

      {/* ----------- MANAGE BOOKS ----------- */}
      {showDelete && (
        <div className="mt-4">
          <h4 style={{ color: "#4a1240" }}>My Products</h4>
          {books.map(b => (
            <div key={b._id} className="border p-2 mb-2 rounded" style={{ borderColor: "#6a1b5a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong style={{ color: "#4a1240" }}>{b.title}</strong>
              <div>
                <button
                  className="btn me-2"
                  style={{ background: "#6a1b5a", color: "white", borderRadius: "5px" }}
                  onClick={() => {
                    setEditingBook(b);
                    setEditForm({
                      title: b.title,
                      author: b.author,
                      genre: b.genre,
                      price: b.price,
                      description: b.description || ""
                    });
                  }}
                >Edit</button>

                <button
                  className="btn"
                  style={{ background: "#8e2a6d", color: "white", borderRadius: "5px" }}
                  onClick={() => deleteBook(b._id)}
                >Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ----------- EDIT FORM ----------- */}
      {editingBook && (
        <div className="mt-4 p-4 rounded shadow" style={{ background: "#4a1240", color: "white" }}>
          <h4>Edit Book</h4>
          <input className="form-control mb-2" value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} />
          <input className="form-control mb-2" value={editForm.author} onChange={e => setEditForm({ ...editForm, author: e.target.value })} />
          <input className="form-control mb-2" value={editForm.genre} onChange={e => setEditForm({ ...editForm, genre: e.target.value })} />
          <input className="form-control mb-2" value={editForm.price} onChange={e => setEditForm({ ...editForm, price: e.target.value })} />
          <textarea className="form-control mb-2" value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} />
          <p><b>Current Image</b></p>
          <img src={`http://localhost:5000${editingBook.image}`} width="100" />
          <input type="file" className="form-control my-2" onChange={(e) => setEditImage(e.target.files[0])} />
          <button className="btn me-3 w-25" style={{ background: "#6a1b5a", color: "white", fontWeight: "bold" }} onClick={updateBook}>Save</button>
          <button className="btn w-25" style={{ background: "#8e2a6d", color: "white" }} onClick={() => setEditingBook(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
