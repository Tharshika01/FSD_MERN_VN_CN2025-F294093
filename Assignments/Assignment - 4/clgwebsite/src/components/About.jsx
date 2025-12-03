import React from "react";

const About = () => {
  return (
    <div style={{ maxWidth: 1500, margin: "0 auto" }}>
      <h2 style={{fontSize:"30px"}}>About the College</h2>

      <section style={{ background: "#d3bebeff", padding: 14, borderRadius: 10, marginTop: 12 }}>
        <h3 style={{fontSize:"25px"}}>History</h3>
        <p style={{fontSize:"20px"}}>Established in 1990, RTS College of Technology was established with a vision to provide world-class technical education and empower rural and urban students with industry-ready skills. Founded by the RTS Educational Trust, the institution began its journey with a strong commitment to academic excellence, innovation, and holistic development. Over the years, the college has grown from a small engineering campus into a vibrant educational hub offering diverse undergraduate and postgraduate programs. With modern laboratories, experienced faculty, and strong industry collaborations, RTS College has consistently focused on nurturing competent engineers and leaders who contribute to society through technology, research, and ethical values.</p>
      </section>

      <section style={{ background: "#d3bebeff", padding: 14, borderRadius: 10, marginTop: 12 }}>
        <h3 style={{fontSize:"25px"}}>Mission & Vision</h3>
        <p style={{fontSize:"20px"}}><strong>Mission:</strong> To impart high-quality education that prepares students for industry and research.</p>
        <p style={{fontSize:"20px"}}><strong>Vision:</strong> To be a centre of excellence in technological education and innovation.</p>
      </section>

      <section style={{ background: "#d3bebeff", padding: 14, borderRadius: 10, marginTop: 12 }}>
        <h3 style={{fontSize:"25px"}}>Achievements</h3>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <div style={{ background: "#994a68ff", padding: 12, borderRadius: 8 }}>🏆 98% placement rate (2024)</div>
          <div style={{ background: "#994a68ff", padding: 12, borderRadius: 8 }}>🔬 National research grants</div>
          <div style={{ background: "#994a68ff", padding: 12, borderRadius: 8 }}>🌐 Global partnerships</div>
        </div>
      </section>
    </div>
  );
};

export default About;