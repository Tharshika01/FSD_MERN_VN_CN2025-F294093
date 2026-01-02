import React from 'react'
import '../styles/Footer.css'

const Footer = () => {
  
     return (
    <footer className="Footer">
     <center><h2>SuperBuy</h2></center> 
     <center><p>Your everyday shopping, made simple.</p></center> 

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} SuperBuy — Built with ❤️ for smart shoppers</p>
      </div>
    </footer>
  )
}
export default Footer