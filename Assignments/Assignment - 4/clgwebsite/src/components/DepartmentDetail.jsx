import React from 'react';
import { useState,useEffect} from 'react';
import {useParams,Link} from 'react-router-dom'
import departmentsData from '../data/departments.json';
const DepartmentDetail = () => {
    const{deptId}=useParams();
    const[dept,setDept]=useState(null);

    useEffect(()=>{
        const found=departmentsData.find(d=>String(d.id)===String(deptId));
        setDept(found||null);
    },[deptId]);

      if (!dept) {
    return (
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h2>Department not found</h2>
        <p><Link to="/departments">Back to departments</Link></p>
      </div>
    );
  }

  const block = { background: "#fff", padding: 14, borderRadius: 10, marginTop: 12 };

  return (
  <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ margin: 0 }}>{dept.name}</h2>
          <p style={{ marginTop: 6, color: "#030302ff" }}>{dept.description}</p>
        </div>
        <div><Link to="/departments" style={{ color: "#0b63d6", fontWeight: 700 }}>Back</Link></div>
      </header>

      <section style={block}>
        <h3>Full Description</h3>
        <p>{dept.fullDescription}</p>
      </section>

      <section style={block}>
        <h3>Courses Offered</h3>
        <ul>{dept.courses.map((c, i) => <li key={i}>{c}</li>)}</ul>
      </section>

      <section style={block}>
        <h3>Faculty</h3>
        <ul>{dept.faculty.map((f, i) => <li key={i}>{f}</li>)}</ul>
      </section>

      <section style={block}>
        <h3>Labs / Facilities</h3>
        <ul>{dept.labs.map((l, i) => <li key={i}>{l}</li>)}</ul>
      </section>
    </div>
  );
};

export default DepartmentDetail;