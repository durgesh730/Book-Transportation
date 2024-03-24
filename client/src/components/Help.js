import React, { useState } from "react";
import Navbar from './Navbar'
import Footer from "./User/Footer"
import "../style/help.css";
import { BsInstagram } from 'react-icons/bs'
import { MdOutlineEmail } from 'react-icons/md'

const Help = () => {
  return (
    <>
      <Navbar />
      <section id="contact">
        <div className='container contact_conatiner'>
          <h5>Get In Touch</h5>
          <h2>Contact Me</h2>

          <div className='contact_options'>
            <article className='contact_option'>
              <MdOutlineEmail className='contact_option-icon' />
              <h4>Email</h4>
              <h6>dc035534@gmail.com</h6>
              <a href="mailto:dc035534@gmail.com" target="_blank">Send a message</a>
            </article>

            <article className='contact_option'>
              <BsInstagram className='contact_option-icon' />
              <h4>Instagram</h4>
              <h5>Any Quary</h5>
              <a href='https://www.instagram.com/_durgesh.chaudhary/' target="_blank">Send a message</a>
            </article>

          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Help;

