import React from "react";

export default function Hero() {
  const scrollToBestSeller = () => {
    const section = document.getElementById("bestSellerSection");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
   <div
  className="hero d-flex align-items-center justify-content-center text-center text-white"
  style={{
    height: "500px",
    background: "url('/lib.jpeg') center / cover",
  }}
>
<div
  style={{
    background: "transparent",
    padding: "40px",
    borderRadius: "15px",
    textAlign: "center",
    color: "white",
    textShadow: "0 0 20px rgba(0,0,0,0.8)"
  }}
>


        <h1>Welcome to TheBookStop</h1>
        <p>Where tales are born</p>

        {/* <button
  className="px-4 py-2 fw-bold"
  style={{
    background: 'linear-gradient(135deg, #4a1240, #6a1b5a)',
    color: 'white',
    border: 'none',
  }}
  onClick={scrollToBestSeller}
>
  Explore Now
</button> */}

      </div>
    </div>
  );
}
