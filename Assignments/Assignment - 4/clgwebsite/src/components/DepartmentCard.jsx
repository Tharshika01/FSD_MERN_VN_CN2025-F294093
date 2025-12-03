import React from 'react';
import { Link } from 'react-router-dom';

const DepartmentCard = ({ dept }) => {
  return (
    <article style={styles.card}>
      
      {/* Icon Section */}
      <div style={styles.iconBox}>
        <img src={dept.icon} alt={dept.name} style={styles.icon} />
      </div>

      <h3 style={styles.title}>{dept.name}</h3>
      <p style={styles.desc}>{dept.description}</p>

      <div style={styles.btn}>
        <Link to={`/departments/${dept.id}`} style={styles.link}>
          View More
        </Link>
      </div>

    </article>
  );
};

const styles = {
  card: {
    background: "#d3bebeff",
    padding: 16,
    borderRadius: 12,
    boxShadow: "0 8px 20px rgba(159, 222, 33, 0.06)",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    transition: "0.2s ease",
    height:"100%",
  },

  iconBox: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    background: "#f4f2f4ad",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8
  },

  icon: {
    width: 36,
    height: 36,
    objectFit: "contain"
  },

  title: {
    margin: 0,
    color: "#0e0f0eff",
    fontWeight: 700
  },

  desc: {
    color: "#0c0e09ff",
    fontSize: 14,
    minHeight: 44,
    flexGrow:1
  },

  link: {
    padding: "8px 12px",
    background: "#3f082aff",
    color: "#fff",
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: 700,
  },

  btn: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop:"auto",
  }
};

export default DepartmentCard;