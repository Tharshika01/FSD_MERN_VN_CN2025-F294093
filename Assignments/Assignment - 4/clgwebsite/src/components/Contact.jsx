import React from 'react';
import { useState,useEffect } from 'react';
import departmentsData from '../data/departments.json';

const Contact = () => {

    const [departments, setDepartments] = useState([]);
    const [form, setForm] = useState({ name: "", email: "", department: "", message: "" });
    const [submitted, setSubmitted] = useState(null);

    useEffect(()=>{
        setDepartments(departmentsData);
    },[]);

    const handleChange = e => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(form);
    setForm({ name: "", email: "", department: "", message: "" });
  };

  const wrapper = { maxWidth: 900, margin: "0 auto" };
  const formStyle = { display: "grid", gap: 25, background: "#fff", padding: 16, borderRadius: 10,height:500,fontSize:"18px"};

  const input = { padding: 10, borderRadius: 8, border: "1px solid #cbd5e1", fontSize: 14 };


  return (
    <div style={wrapper}>
      <h2 style={{fontSize:"30px"}}>Contact</h2>

      <form style={formStyle} onSubmit={handleSubmit}>
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          Name
          <input name="name" required value={form.name} onChange={handleChange} style={input} />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          Email
          <input name="email" required type="email" value={form.email} onChange={handleChange} style={input} />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          Department
          <select name="department" required value={form.department} onChange={handleChange} style={input}>
            <option value="">Select department</option>
            {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
          </select>
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          Message
          <textarea name="message" required value={form.message} onChange={handleChange} style={{ ...input, minHeight: 120 }} />
        </label>

        <div style={{ display: "flex", gap: 10 }}>
          <button type="submit" style={{ padding: "14px 14px", borderRadius: 8, border: "none", background: "#994a68f", color: "#994a68f", fontWeight: 700 }}>Submit</button>
          <button type="button" onClick={() => setForm({ name: "", email: "", department: "", message: "" })} style={{ padding: "10px 14px", borderRadius: 8, border: "2px solid #994a68f", background: "#994a68f",fontWeight: 700 }}>Reset</button>
        </div>
      </form>

      {submitted && (
        <div style={{ marginTop: 14, background: "#f8fafc", padding: 12, borderRadius: 8 }}>
          <h3>Submitted Details</h3>
          <p><strong>Name:</strong> {submitted.name}</p>
          <p><strong>Email:</strong> {submitted.email}</p>
          <p><strong>Department:</strong> {submitted.department}</p>
          <p><strong>Message:</strong> {submitted.message}</p>
        </div>
      )}
    </div>
  )
}

export default Contact