import React, { useContext, useState } from 'react'
import { GoVerified } from 'react-icons/go';
import Navbar from '../Navbar';
import Footer from './Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import driverContext from '../useContext/driverContext';
import { ToastContainer, toast } from 'react-toastify';
import { FaRegThumbsUp } from 'react-icons/fa';

const VehicleDetails = () => {
    const navigate = useNavigate();
    const context = useContext(driverContext);
    const [Booked, setBooked] = useState("Booked");
    const { SavedComment,  ChangeBookState, ChangeBooked, sendNotification } = context;
    const location = useLocation();
    const [comment, setcomment] = useState();
    const data = location.state?.dat;
    const Address = location.state?.Address
    // console.log( Address)

    const handleDoneBookings = () => {
        document.getElementById("bookModal").style.display = "block";
    }  

    const handleComment = (e) => {
        e.preventDefault();
        if (comment === undefined) {
            toast("Please write Something", {
                autoClose: 1000,
            })
        } else {
            SavedComment(comment);
            toast("Your Comment Saved Successfully", {
                autoClose: 1000,
            })
        }
    }

    function CloseModal() {
        document.getElementById("bookModal").style.display = "none";
    }

    const handleVerified = () => {
        ChangeBooked(Booked, data?._id)
        ChangeBookState(Booked, data?._id)
        sendNotification({email:data.email, Address});
        console.log(data.email, Address)
        toast("Your Vehicle Booked Successfully", {
            autoClose: 1000,
        })
        // document.getElementById("bookModal").style.display = "none";
        CloseModal()
        navigate('/user')
    }

    return (
        <>
            <Navbar />
            <div className='container'>
                <div className='booked' >
                    <div className='topheading text-center my-4 '>
                        <h3 >Vehicle Details</h3>
                    </div>

                    <div className='detailstable'>
                        <table>
                            <tr>
                                <td>Transportation</td>
                                <td className='textcolor' >{data?.transName}</td>
                            </tr>

                            <tr>
                                <td>Driver Name</td>
                                <td className='textcolor' >{data?.name}</td>
                            </tr>

                            <tr>
                                <td>Verified</td>
                                <td className='textcolor' ><span>{
                                    data?.isVerified ? <GoVerified /> : "Not Verified"
                                }</span></td>
                            </tr>
                            <tr>
                                <td>Body Size</td>
                                <td className='textcolor' >{data?.bodysize}</td>
                            </tr>

                            <tr>
                                <td>Fair Price</td>
                                <td className='textcolor' >{data?.basefare} Rs/Km</td>
                            </tr>

                            <tr>
                                <td>Loading capacity</td>
                                <td className='textcolor' >{data?.lodingCapacity} Ton</td>
                            </tr>
                        </table>
                        <table>
                            <tr>
                                <td>Name</td>
                                <td className='textcolor' >{Address?.name}</td>
                            </tr>

                            <tr>
                                <td>Phone</td>
                                <td className='textcolor' >{Address?.phone}</td>
                            </tr>

                            <tr>
                                <td>Pickup address</td>
                                <td className='textcolor' >{Address?.pickupAddress}</td>
                            </tr>
                            <tr>
                                <td>Pickup City</td>
                                <td className='textcolor' >{Address?.Pcity}</td>
                            </tr>
                            <tr>
                                <td>DropOff Address</td>
                                <td className='textcolor' >{Address?.DropOffAddress}</td>
                            </tr>

                            <tr>
                                <td>DropOff City</td>
                                <td className='textcolor' >{Address?.Dcity}</td>
                            </tr>
                        </table>
                    </div>

                    <div className='last-btn' >
                        {/* <small className='my-2' > <FaHandPointRight /> <span>Please Read all the details carefully and than click to button </span></small> */}
                        <div className='text-center' >
                            <button className='cart-btn' onClick={handleDoneBookings} >Book Know</button>
                        </div>
                    </div>

                    <section id="contact">
                        <div className='text-center comment '>
                            <h2>How is Loadkro helpful for me ?</h2>
                        </div>
                        <div className='container contact_conatiner'>
                            <form >
                                <div className='text-center' >
                                    <textarea name='comment' rows="7" placeholder='Your Comments Minimum 80 Words' required
                                        onChange={(e) => { setcomment((prev) => ({ ...prev, comment: e.target.value })) }}
                                    ></textarea>
                                    <button onClick={handleComment} className='btn-save'>Save</button>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </div>

            <div id="bookModal" className="modal">
                <div className="modal-content">
                    <span><FaRegThumbsUp /></span>
                    <h2>Your Are sure to Book this vehicle!</h2> 
                    <div className='btn-modalm my-4'>
                        <button className='btn-view mx-4 ' onClick={CloseModal} >Close</button>
                        <button className='btn-view mx-4 ' onClick={handleVerified} >Submit</button>
                    </div>
                </div>
            </div>

            <Footer />
            <ToastContainer />
        </>
    )
}

export default VehicleDetails
