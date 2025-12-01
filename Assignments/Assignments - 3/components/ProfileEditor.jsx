import React, { useState } from "react";

const ProfileEditor = () => {
  const [profile, setProfile] = useState({ name: "", email: "", phone: "" });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <input name="name" placeholder="Name" value={profile.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={profile.email} onChange={handleChange} />
      <input name="phone" placeholder="Phone" value={profile.phone} onChange={handleChange} />
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </div>
  );
};

export default ProfileEditor;
