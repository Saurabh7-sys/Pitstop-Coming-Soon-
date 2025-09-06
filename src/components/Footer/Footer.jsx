import React from 'react'
import { FaRocket, FaGlobe } from 'react-icons/fa'
import style from './footer.module.css'
import logo from '../../assets/PitStopLogo.webp'

const Footer = () => {
  return (
    <footer className={style.footerMain}>
      <div className={style.footerContent}>
        <img src={logo} alt="Company Logo" className={style.logo} />
        <p className={style.copy}>© {new Date().getFullYear()} PitStop. All rights reserved.</p>
        <p className={style.country}><FaGlobe /> Dubai, UAE</p>
      </div>
    </footer>
  )
}

export default Footer
