import React, { useState } from 'react'
import pic from '../../images/Logo.png'
import { ImLocation2 } from 'react-icons/im';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import navpic from '../../images/user_web-1598433228.svg'
import { FaRegThumbsUp } from 'react-icons/fa';
import { toast } from 'react-toastify';

const EntryPage = ({ handleSearch, setcityName }) => {
  const navigate = useNavigate()
  AOS.init({
    offset: 120,
    delay: 0,
    duration: 1700,
  });

  const user = JSON.parse(localStorage.getItem("user"))
  const [fullnav, setfullnav] = useState(false);

  function openNav() {
    if (!fullnav) {
      document.getElementById("Sidenav").style.width = "100%";
      setfullnav(true);
    } else {
      document.getElementById("Sidenav").style.width = "0";
      setfullnav(false)
    }
  }

  function myFunction() {
    document.querySelector("#icon").classList.toggle("change");
  }

  function CloseModal() {
    document.getElementById("Modal").style.display = "none";
  }

  const handleVerified = () => {
    CloseModal()
    localStorage.clear();
    toast("Logout Successfully", {
      autoClose: 1200,
    })
    navigate('/login')
  }

  const handleClear = () => {
    document.getElementById("Modal").style.display = "block";
  }

  return (
    <>

      <div className="entry-container">
        <div className="left-side-entry ">
          <div className="top-left d-flex align-items-center">
            <div className='text-center' data-aos="fade-right" >
              <div class="enter-container" id='icon' onClick={() => {openNav(); myFunction();}}>
                <div class="bar1"></div>
                <div class="bar2"></div>
                <div class="bar3"></div>
              </div>
            </div>
          </div>
          <div className='images-entry' data-aos="fade-down" >
            <img className="entry-img my-4 " src={pic} alt="img" />
          </div>
        </div>
      </div>

      <div className='entry-durgesh-img' data-aos="fade-up" >
        <div className='durgesh-enter' >
          <div className='seleted-entry' >
            <span>State</span> 
            <div className='location-entry' >
              <small><ImLocation2 /></small>
              <h6>Punjab</h6>
            </div>
          </div>

          <div className='entry-input' >
            <div class="input-group mb-3">
              <input type="text" class="form-control" name='cityName' placeholder=" Search By City Name"
                aria-label="Recipient's username" aria-describedby="basic-addon2"
                onChange={(e) => { setcityName((prev) => ({ ...prev, cityName: e.target.value })) }}
              />
              <button onClick={handleSearch} class="input-group-text entry-btn" id="basic-addon2">Search</button>
            </div>
          </div>
        </div>
      </div>

      <div id="Sidenav" className="fullsidenav text-center">
        <h5 style={{ color: "white", alignItems: "center" }}>
          <a lassName='des'><img src={navpic}></img> {user.username} </a>
        </h5>

        <h2>Welcome to Loadkro</h2>
        <div className=' customerHelp'>
          <Link to="/book">Booked Vehicles</Link>
          <Link to="/help">FAQ's & Help</Link>
          <Link onClick={handleClear} >Logout</Link>
        </div>
      </div>

      <div id="Modal" className="modal">
        <div className="modal-content">
          <span><FaRegThumbsUp /></span>
          <h2>Your Are sure to Logout!</h2>
          <div className='btn-modalm my-4'>
            <button className='btn-view mx-4 ' onClick={CloseModal} >Close</button>
            <button className='btn-view mx-4 ' onClick={handleVerified} >Confirmed</button>
          </div>

        </div>
      </div>
    </>
  )
}

export default EntryPage
