import React, { useState } from "react";

const AddPostFetch = () => {
  const [post, setPost] = useState({ title: "", body: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://dummyjson.com/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });

      if (response.ok) {
        setMessage("Post Added!");
        setPost({ title: "", body: "" });
      } else {
        setMessage("Failed to add post");
      }
    } catch {
      setMessage("Failed to add post");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={post.title}
          onChange={handleChange}
        />
        <input
          name="body"
          placeholder="Body"
          value={post.body}
          onChange={handleChange}
        />
        <button type="submit">Add Post</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default AddPostFetch;
