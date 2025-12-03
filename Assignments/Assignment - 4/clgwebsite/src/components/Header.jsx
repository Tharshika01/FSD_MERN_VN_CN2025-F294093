import React from 'react'
import { NavLink } from 'react-router-dom';

const Header = () => {

const link = ({ isActive }) => ({
    color: isActive ? "#60103dff" : "#fff",
    textDecoration: "none",
    padding: "6px 10px",
    borderRadius: 6,
    fontSize:18,
    fontWeight: 800
  });
  return (
    <header style={styles.container}>
        <div style={styles.brand}>
            {/* <div style={styles.logo}>
                Logo
            </div> */}
            <div>
                <div style={{fontWeight:800,fontSize:"20px"}}>RTS College</div>
                <div style={{fontSize:15}}>Excellence in Education</div>
            </div>
        </div>

        <nav style={styles.navbar}>
            <ul style={styles.unord}>
                <li><NavLink to="/" style={link}>Home</NavLink></li>
                <li><NavLink to="/about" style={link}>About</NavLink></li>
                <li><NavLink to="/departments" style={link}>Departments</NavLink></li>
                <li><NavLink to="/contact" style={link}>Contact</NavLink></li>
            </ul>
        </nav>
    </header>
  )
}

const styles={
    container:{
        height:100,
        display:"flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 22px",
        background: "linear-gradient(90deg, #60103D, #A84274, #2C0A22)",
        color: "#fff",
        position: "sticky",
        top: 0,
        left: 0,
        zIndex: 999,
    },

    brand:{
        display:"flex",
        alignItems:"center",
        gap:20
    },
    logo:{
        width: 44,
        height: 44,
        borderRadius: 8,
        background: "#fff", 
        padding: 6, 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        color: "#06326a", 
        fontWeight: 800
    },
    navbar:{
        flex:"0 0 auto"
    },
    unord:{
        listStyle: "none", 
        display: "flex", 
        gap: 26, 
        margin: 0, 
        padding: 0, 
        alignItems: "center", 
        whiteSpace: "nowrap"
    },
}
export default Header;