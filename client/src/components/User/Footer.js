import React from 'react';
import { BsLinkedin } from 'react-icons/bs'
import { FiInstagram } from 'react-icons/fi'
import { GrYoutube } from 'react-icons/gr'
import { FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BottomNav = () => {
  return (
    <>
         <div className="Main_page-bottomNav">
            <h2>Loadkro</h2>
            <ul className='nav_item-list'>
               <li><a href='#'>Home</a></li>
               <li><a href="https://okcredit.in/blog/how-does-transportation-industry-work/" target="_blank">About</a></li>
               {/* <li><Link to="/book">About</Link></li> */}
               <li><a href="https://www.instagram.com/_durgesh.chaudhary/" target="_blank">Experience</a></li>
               <li><Link to="/help">Contact</Link></li>
            </ul>

            <div className='footer_socials_MainPage'>
               <a href="https://www.linkedin.com/in/durgesh-chaudhary-535a76211/" target="_blank"><BsLinkedin /></a>
               <a href="https://www.instagram.com/_durgesh.chaudhary/" target="_blank"><FiInstagram /></a>
               <a href="https://www.youtube.com/@nanochat" target="_blank"><GrYoutube /></a>
               <a href="https://www.youtube.com/@nanochat" target="_blank"><FaTwitter/></a>
            </div>
            <div className="line"></div>

            <div className='footer_copyright_MainPage'>
               <small>&copy; Durgesh Chaudhary. ALL rights reserved</small>
            </div>
         </div>
    </>
  )
}

export default BottomNav
