import React, { useState } from "react";

const LiveUsername = () => {
  const [username, setUsername] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <p>Entered: {username}</p>
    </div>
  );
};

export default LiveUsername;
