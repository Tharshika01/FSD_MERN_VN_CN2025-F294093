import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DepartmentCard from './DepartmentCard';
import departmentsdata from '../data/departments.json';
import bg from '../assets/background.jpg'
const Home = () => {
    const [departments,setDepartments]=useState([]);

    useEffect(()=>{
        setDepartments(departmentsdata);
    },[]);
  return (
    <div style={{ maxWidth: 1500, margin: "0 auto" }}>
      
      <section style={styles.hero}>
        <div>
            <h1 style={{ margin: 0 }}>Welcome to RTS College of Technology</h1>
            <p style={{ opacity: 0.95, marginTop: 8 }}>Where Innovation meets Education</p>
            <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
                <Link to="/contact" style={{ background: "#fff", color: "#06326a", padding: "10px 14px", borderRadius: 8, textDecoration: "none", fontWeight: 700 }}>Apply Now</Link>
                <Link to="/departments" style={{ color: "#fff", border: "1px solid white", padding: "10px 14px", borderRadius: 8, textDecoration: "none" }}>Explore Departments</Link>
            </div>
        </div>
        <div style={{ width: 280,opacity: 0.95 }}>
          <div style={{ fontSize: 48, fontWeight: 900 }}>🎓</div>
        </div>
      </section>

       <section style={{ background: "#d3bebeff", padding: 18, borderRadius: 10, marginBottom: 18 }}>
        <h2 style={{ marginTop: 0,fontSize:"30px" }}>Why this college?</h2>
        <p style={{fontSize:"20px"}}>Our college stands as a center of academic excellence, combining world-class education with real-world exposure. Equipped with modern laboratories, experienced faculty, and an industry-aligned curriculum, we ensure that every student gains strong technical skills along with professional development. Through internships, workshops, innovation labs, and placement training, we prepare students to confidently face global challenges and build successful careers. Beyond academics, we focus on leadership, discipline, and values — shaping students into responsible individuals who can contribute to society and the world.</p>
      </section>

      <section>
        <h2 style={{fontSize:"30px"}}>Top Departments</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14, marginTop: 12 }}>
          {departments.slice(0, 3).map(d => (<DepartmentCard key={d.id} dept={d} />))}
        </div>
        <div style={{ marginTop: 12 }}>
          <Link to="/departments" style={{ textDecoration: "none", fontWeight: 700, color: "#8f195cff" }}>View All Departments →</Link>
        </div>
      </section>

    </div>
  );
};

const styles={
    hero:{
    borderRadius: 12,
    padding: "36px 20px",
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 18,
    marginBottom: 18,
    height: "700px",
    }
}
export default Home;