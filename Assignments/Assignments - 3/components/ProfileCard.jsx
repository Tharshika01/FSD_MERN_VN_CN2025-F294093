import React from "react";
import authorImage from "./author.png"; 

const ProfileCard = () => {
  const profiles = [
    { name: "Tharshika", role: "IT Student", image: authorImage },
 
  ];

  return (
    <div>
      {profiles.map((profile, index) => (
        <div
          key={index}
          style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}
        >
          <img src={profile.image} alt={profile.name} width={100} />
          <h3>{profile.name}</h3>
          <p>{profile.role}</p>
        </div>
      ))}
    </div>
  );
};

export default ProfileCard;
