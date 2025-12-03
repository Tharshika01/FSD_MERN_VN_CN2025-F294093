import React from 'react'
import { NavLink } from 'react-router-dom'
const Footer = () => {

const link = ({ isActive }) => ({
    color: isActive ? "#fff" : "#cfd6e1",
    textDecoration: "none",
    margin: "0 12px",
    fontSize: 17,
  });
  return (
    <footer style={styles.container}>
        <div style={styles.links}>
            <NavLink to="/" style={link}>Home</NavLink>
            <NavLink to="/about" style={link}>About</NavLink>
            <NavLink to="/departments" style={link}>Departments</NavLink>
            <NavLink to="/contact" style={link}>Contact</NavLink>
        </div>
         <hr style={styles.line} />
         © {new Date().getFullYear()} RTS College of Technology •242, 10th street, ABC nagar, Chennai • Email: info@smkcollege.edu
    </footer>
  )
}

const styles={
    container:{
    background: "#60103dff",
    textAlign: "center",
    padding: "35px 12px",
    color: "#f6f6f6ff",
    fontSize:15 ,
    },
    links:{
        marginBottom:18,
    },
    link:{
    width: "100%",
    borderColor: "#000000ff",
    margin: "12px auto 22px auto",
    }
}
export default Footer