import React,{useState,useEffect} from 'react';
import DepartmentCard from './DepartmentCard';
import departmentsData from '../data/departments.json';
const Departments = () => {
    const [departments,setDepartments]=useState([]);
    
    useEffect(()=>{
        setDepartments(departmentsData);
    },[]);
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <h2 style={{fontSize:"30px"}}>Departments</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14, marginTop: 40 }}>
        {departments.map(d => <DepartmentCard key={d.id} dept={d} />)}
      </div>
    </div>
  )
}

export default Departments;