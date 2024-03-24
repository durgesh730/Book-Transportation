import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './User/Footer'
import driverContext from './useContext/driverContext'
import { toast } from 'react-toastify';
import '../style/admin.css'
import { FaRegThumbsUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import NotFound from './NotFound';

const BookedVehicles = () => {
    const navigate = useNavigate();
    const context = useContext(driverContext);
    const { getbookedVehicles, booked, ChangeBooked,
        getbookedAdminSide, ChangeBookState,
        getbookedDriverSide, DeleteBookedVehicles } = context;

    // console.log(booked, "booked")

    const [Booked, setBooked] = useState("Cancel");
    const userType = localStorage.getItem("type")
    const [id, setId] = useState();

    const handleCancel = (id) => {
        setId(id)
        document.getElementById("Modal").style.display = "block";
    }

    useEffect(() => {
        if (userType === "user") {
            getbookedVehicles();
        } else if (userType === "admin") {
            getbookedAdminSide();
        } else {
            getbookedDriverSide();
        }
    }, [])

    function CloseModal() {
        document.getElementById("Modal").style.display = "none";
    }

    const handledelete = (id) => {
        DeleteBookedVehicles(id);
        toast("Deleted Successfully", {
            autoClose: 1500,
        })
    }

    const handledetails = (item) => {
        navigate('/userbook', { state: { item } })
    }

    const handleSubmit = () => {
        ChangeBooked(Booked, id)
        ChangeBookState(Booked, id)
        document.getElementById("Modal").style.display = "none";
        toast("Cancelled successfully", {
            autoClose: 1500,
        })
    }

    return (
        <>
            <Navbar />
            <div className='mx-3'>
                <div className='tableVerified'>
                    {booked === undefined ?
                        <div class="loader my-4 "></div>
                        :
                        booked?.length === 0 ?
                            <NotFound />
                            :
                            <>
                                <h3 className='my-4' >Vehicles Booking Status</h3>
                                <table>
                                    <tr className='my-4'>
                                        {
                                            userType === 'admin' ?
                                                <>
                                                    <td>S.No</td>
                                                </> : ("")
                                        }
                                        <td>Pickup Address</td>
                                        <td>DropOff Address</td>
                                        <td>Booked Date</td>
                                        <td>Phone Number</td>
                                        <td>Status</td>
                                    </tr>

                                    {booked?.map((item, i) => {
                                        return (
                                            <>
                                                {userType === "user" || userType === "Driver" ?
                                                    item.status === "Booked" || item.status === "Cancel" ?
                                                        <tr key={i} className='trtd' >
                                                            <td>{item.pickupAddress}, {item.PickupCity}, {item.PickupPincode} </td>
                                                            <td>{item.DropOffAddress}, {item.DropCity}, {item.DropPincode}  </td>
                                                            <td>{item.date ? item.date?.slice(0, 10) : "Not available"}</td>
                                                            <td>{item.phone}</td>
                                                            <td>{item.status}</td>
                                                            <td><button onClick={() => { handledetails(item?.vehicleId) }} className='btn-view'>View</button></td>
                                                            {
                                                                item.status !== "Cancel" ?
                                                                    <td><button className='btn-delete' onClick={() => handleCancel(item.vehicleId)} >Cancel</button></td>
                                                                    : ("")
                                                            }
                                                        </tr>
                                                        : ("")
                                                    :
                                                    <tr key={i} className='trtd' >
                                                        <td>{i + 1} </td>
                                                        <td>{item.pickupAddress}, {item.PickupCity}, {item.PickupPincode} </td>
                                                        <td>{item.DropOffAddress}, {item.DropCity}, {item.DropPincode}  </td>
                                                        <td>{item.date ? item.date?.slice(0, 10) : "Not available"}</td>
                                                        <td>{item.phone}</td>
                                                        <td>{item.status}</td>
                                                        <td><button onClick={() => { handledetails(item?.vehicleId) }} className='btn-view'>View</button></td>
                                                        <td><button onClick={() => { handledelete(item?._id) }} className='btn-delete'>Delete</button></td>
                                                        {item.status !== "Cancel" ?
                                                            <td><button className='btn-view' onClick={() => handleCancel(item.vehicleId)} >Cancel</button></td>
                                                            : ""}
                                                    </tr>
                                                }
                                            </>
                                        )
                                    }
                                    )}
                                </table>
                            </>
                    }
                </div>
            </div>

            <div id="Modal" className="modal">
                <div className="modal-content">
                    <span><FaRegThumbsUp /></span>
                    <h2>Your Are sure to Cancel It !</h2>
                    <div className='btn-modalm my-4'>
                        <button className='btn-view mx-4 ' onClick={CloseModal} >Close</button>
                        <button className='btn-view mx-4 ' onClick={handleSubmit} >Submit</button> :
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default BookedVehicles
