import React, { useContext, useEffect, useState } from 'react'
import '../style/navbar.css'
import navpic from '../images/user_web-1598433228.svg'
import { IoIosArrowDown } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineHome } from 'react-icons/ai';
import { RiTruckLine } from 'react-icons/ri';
import { AiFillSetting, AiFillDelete } from 'react-icons/ai';
import { MdLocationOn, MdOutlineLogout } from 'react-icons/md';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { FaRegThumbsUp } from 'react-icons/fa';
import { GoVerified } from 'react-icons/go';
import { Link, useNavigate } from 'react-router-dom';
import driverContext from './useContext/driverContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import { serverhost } from '../host';


const Navbar = () => {
    const context = useContext(driverContext)
    const { editUserProfiledata, data, getData } = context;
    const totalVehicle = data.length;
    const navigate = useNavigate();

    const [name, setname] = useState();
    const [Nav, setNav] = useState(false);
    const [dropdown, setdropdown] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"))
    const [link, setLink] = useState({ link: "" });
    const userType = localStorage.getItem("type")

    const useInput = (initialValue) => {
        const [value, setValues] = useState(initialValue)
        const handlChange = (event) => {
            setValues(event.target.value);
        }

        const changeValue = (v) => {
            setValues(v)
        }
        return {
            value,
            onChange: handlChange,
            onSet: changeValue
        };
    }

    const username = useInput("");
    const email = useInput('');
    const phone = useInput('')


    const handleSideNav = () => {
        if (Nav === false) {
            document.getElementById("mySidenav").style.width = "250px";
            setNav(true);
        } else {
            document.getElementById("mySidenav").style.width = "0";
            setNav(false);
        }
    }

    function handledropdown() {
        if (dropdown === false) {
            document.getElementById("profileOption").style.height = "fit-content";
            setdropdown(true);
            // } else {
            //     document.getElementById("profileOption").style.height = "0px";
            //     setdropdown(false);
            // }
        }
    }

    function handledropdown2() {
        document.getElementById("profileOption").style.height = "0px";
        setdropdown(false);
    }

    const handleEdits = () => {
        editUserProfiledata(user._id, username, email, phone, link)
        handleOpen();
        toast("Your Profile Updated Successfully", {
            autoClose: 1000,
        })
    }

    var modal = document.getElementById("myModal");
    function handleModal() {
        modal.style.display = "block";
    }

    function handleOpen() {
        modal.style.display = "none";
    }

    const handleClearLogout = () => {
        document.getElementById("NavModal").style.display = "block";
    }

    //  fetching data according users 

    const handlelogin = async (e) => {
        const data = await fetch(`${serverhost}/user/getUserData`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            }
        });
        const res = await data.json();
        if (res !== null) {
            setname(res.data);
            username.onSet(res.data?.username)
            email.onSet(res.data?.email)
            phone.onSet(res.data?.phone)
        }
    };


    function CloseModal() {
        document.getElementById("NavModal").style.display = "none";
    }

    const handleVerified = () => {
        document.getElementById("NavModal").style.display = "none";
        localStorage.clear();
        navigate('/login')
        toast("Logout Successfully", {
            autoClose: 1000,
        })
    }

    useEffect(() => {
        handlelogin();
        getData();
    }, [setname])

    return (
        <>
            {/* <EntryPage/> */}
            <div className='Navbar'>
                <div className='container'>
                    <div className='durgesh' >
                        <div className='navLeft'>
                            <span>Loadkro</span>
                        </div>

                        <div className='navRight'>
                            {
                                (userType === 'user') ? <Link to='/user' className='des home' > <AiOutlineHome /></Link> : (
                                    <>
                                        {
                                            userType === 'Driver' ? (
                                                <Link to='/driver' className='des home '> <AiOutlineHome /></Link>
                                            ) : (<Link to='/admin' className='des home '> <AiOutlineHome /></Link>)
                                        }
                                    </>
                                )
                            }

                            {
                                (userType === 'user') ?
                                    //  <Link className='des' to='/cart'> <span><BsCartFill /> </span></Link> 
                                    " "
                                    : (
                                        <>
                                            {
                                                userType === "Driver" ? (
                                                    <>
                                                        <Link className='des' to='/driverintro' state={0} > <span><RiTruckLine /> </span></Link>
                                                        <Link className='des' to='/delvehicle' > <span><AiFillDelete/> </span></Link>
                                                        <Link className='des' to='/book' > <span><BsFillBookmarkFill /> </span></Link>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Link className='des' to='/verified' > <span><GoVerified /> </span></Link>
                                                        <Link className='des' to='/cities' > <span><MdLocationOn /> </span></Link>
                                                        <Link className='des' to='/book' > <span><BsFillBookmarkFill /> </span></Link>
                                                    </>
                                                )
                                            }
                                        </>
                                    )
                            }
                            <a className='des  name' onMouseEnter={handledropdown} onClick={handledropdown2} ><img src={navpic}></img> {user.username ? user.username : "Not Available "}<span className='formDrop' ><IoIosArrowDown /></span></a>
                            <span className='ManuIcon' onClick={handleSideNav} ><i className="fa fa-bars"></i></span>
                        </div>
                    </div>
                </div>
            </div>

            <div onMouseLeave={handledropdown2} className="profile-options" id="profileOption">
                <ul>
                    <li>
                        <a style={{ cursor: "pointer" }} to="/profiledetails" onClick={handleModal} >My Profile</a>
                    </li>

                    {
                        userType === "user" ?
                            <li >
                                <Link to="/book">Booked Vehicles</Link>
                            </li> : ""
                    }

                    <li>
                        <Link to="/help">FAQ's & Help</Link>
                    </li>
                    <li >
                        <Link style={{ cursor: "pointer" }} onClick={handleClearLogout} >Logout</Link>
                    </li>
                </ul>
            </div>


            <div className='sidenav' id="mySidenav">
                <a className='des'><img src={navpic}></img> {name?.username}</a>

                {
                    (userType === 'user') ?
                        <>
                            <Link className='desicon' to={'/user'} ><AiOutlineHome /> Home</Link>
                            <Link to="/book" style={{ fontSize: "1rem" }}> <BsFillBookmarkFill /> Booked Vehicles</Link>
                            <Link style={{ cursor: "pointer", fontSize: "1rem" }} to="/profiledetails" onClick={handleModal} > <CgProfile/> My Profile</Link>
                        </>
                        : (
                            <>
                                {
                                    userType === 'Driver' ? (
                                        <Link to='/driver' className='des home '> <AiOutlineHome /> Home</Link>
                                    ) : (<Link to='/admin' className='des home '> <AiOutlineHome /> Home</Link>)
                                }
                            </>
                        )
                }

                {
                    (userType === 'user') ?
                        //  <Link className='des' to='/cart'> <span><BsCartFill /> </span></Link> 
                        " "
                        : (
                            <>
                                {
                                    userType === "Driver" ? (
                                        <>
                                            <Link className='des' to='/driverintro' state={0} > <span><RiTruckLine /> Add Details </span></Link>
                                            <Link className='des' to='/book' > <span><BsFillBookmarkFill /> Booked Vehicles </span></Link> 

                                        </>
                                    ) : (
                                        <>
                                            <Link className='des' to='/verified' > <span><GoVerified /> Verify </span></Link>
                                            <Link className='des' to='/cities' > <span><MdLocationOn /> Add City </span></Link>
                                            <Link className='des' to='/book' > <span><BsFillBookmarkFill /> Booked Vehicles </span></Link>
                                        </>
                                    )
                                }
                            </>
                        )
                }
                <Link style={{ cursor: "pointer", fontSize: "1rem" }} onClick={handleClearLogout}><MdOutlineLogout /> Logout</Link>
            </div>

            {/* my profile modal  */}

            <div div id="myModal" class="modal" >
                <div class="modal-content my-4 ">
                    <div className='proDetails text-center '>
                        <span>Account Settings <AiFillSetting /> </span>
                    </div>

                    <div className='uploadImg' >

                        <div>
                            <div className='infoProfile' >
                                <div className='' >
                                    <TextField
                                        id="standard-password-input"
                                        label="Name"
                                        type="name"
                                        autoComplete="current-password"
                                        variant="standard"
                                        value={username.value}
                                        onChange={username.onChange}
                                    />
                                </div>

                                <div className='my-2' >
                                    <TextField
                                        id="standard-password-input"
                                        label="Phone"
                                        type="phone"
                                        autoComplete="current-password"
                                        variant="standard"
                                        value={phone.value}
                                        onChange={phone.onChange}
                                    />
                                </div>

                                {
                                    name?.type === 'user' || name?.type === "admin" ? "" : (
                                        <div className='num' >
                                            <h6>Total Vehicles</h6>
                                            <span className='totalvehicle' > {totalVehicle} </span>
                                        </div>
                                    )
                                }
                                <div className='my-2'>
                                    <TextField
                                        id="standard-password-input"
                                        label="Email"
                                        type="email"
                                        autoComplete="current-password"
                                        variant="standard"
                                        value={email.value}
                                        onChange={email.onChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* <div class="w-50 text-center ">
                            <label for="formFile" class="form-label">Upload Image</label>
                            <input class="form-control" value={link.link} name='link' type="file" id="formFile"
                                onChange={(event) => {
                                    setLink((prev) => ({ ...prev, link: event.target.value }));
                                }}
                            />
                        </div> */}
                    </div>
                    <div className='text-center my-4' >
                        <button onClick={handleOpen} className=' myprofile-btn ' >close</button>
                        <button className=' myprofile-btn mx-4' onClick={handleEdits} >Save</button>
                    </div>
                </div>
            </div >

            <div id="NavModal" className="modal">
                <div className="modal-content">
                    <span><FaRegThumbsUp /></span>
                    <h2>Your Are sure to Logout!</h2>

                    <div className='btn-modal my-4'>
                        <button className='btn-view mx-4 ' onClick={CloseModal} >Close</button>
                        <button className='btn-view mx-4 ' onClick={handleVerified} >Confirmed</button>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </>
    )
}

export default Navbar
