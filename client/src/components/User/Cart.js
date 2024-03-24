import React, { useContext } from 'react'
import Navbar from '../Navbar'
import '../../style/cart.css'
import Footer from './Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import driverContext from '../useContext/driverContext';
import { toast } from 'react-toastify';
import { FaRegThumbsUp } from 'react-icons/fa';

const Cart = () => {
    const context = useContext(driverContext);
    const { Address, setaddress, AddAddress } = context;
    const navigate = useNavigate();
    const location = useLocation();
    const dat = location.state;

    const handleSaved = () => {
        const { pickupAddress, Ppincode,
            Pcity,
            driverId,
            DropOffAddress,
            Dpincode,
            Dcity,
            name,
            Req,
            date,
            phone } = Address
        var letters = /^[A-Za-z]+$/;
        if (pickupAddress === '') {
            toast("Please fill the Address", {
                autoClose: 1000,
            })
        }else if (DropOffAddress === '') {
            toast("Please fill DropOff Address", {
                autoClose: 1000,
            })
        }else if (Pcity === '') {
            toast("Please fill City Name", {
                autoClose: 1000,
            })
        } else if (!Pcity?.match(letters)) {
            toast("Please enter text only", {
                autoClose: 1000,
            })
        } else if (Dcity === '') {
            toast("Please fill City Name", {
                autoClose: 1000,
            })
        } else if (!Dcity?.match(letters)) {
            toast("Please enter text only", {
                autoClose: 1000,
            })
        } else if (Ppincode === '') {
            toast("Please fill Pin Code", {
                autoClose: 1000,
            })
        } else if (Dpincode === '') {
            toast("Please fill Pin Code", {
                autoClose: 1000,
            })
        } else if (phone === '') {
            toast("Please fill City Name", {
                autoClose: 1000,
            })
        } else if (Req === '') {
            toast("Please fill City Name", {
                autoClose: 1000,
            })
        } else if (date === '') {
            toast("plz fill Date", {
                autoClose: 1500,
            })
        } else {
            document.getElementById("saveModal").style.display = "block";
        }
    }


    function CloseModal() {
        document.getElementById("saveModal").style.display = "none";
    }

    const handleVerified = () => {
        AddAddress();
        toast("Your Data Saved Successfully", {
            autoClose: 1500,
        })
        navigate('/vehicledetails', { state: { dat, Address } })
        CloseModal()
    }

    return (
        <>
            <Navbar />
            <div className='container'>
                <div className='bookedD' >
                    <div className='headline text-center'>
                        <h2>We needs some details for Your bookings </h2>
                    </div>

                    <div className='container formfields '>
                        <form >
                            <div className='inputs'>
                                <div className="form-group p-3 ">
                                    <label>From</label>
                                    <input type="AIQRank" className="form-control" id="AIQRank" aria-describedby="emailHelp" placeholder="Pickup Address"
                                        name='pickupAddress'
                                        onChange={(e) => setaddress((prev) => ({ ...prev, pickupAddress: e.target.value }))}
                                    />
                                </div>

                                <div className="form-group p-3 ">
                                    <label>To</label>
                                    <input type="AIQRank" className="form-control" id="AIQRank" aria-describedby="emailHelp" placeholder="DropOff Address"
                                        name='DropOffAddress'
                                        onChange={(e) => setaddress((prev) => ({ ...prev, DropOffAddress: e.target.value }))}
                                    />
                                </div>

                                <div className="form-group p-3 ">
                                    <input type="AIQRank" className="form-control" id="AIQRank" aria-describedby="emailHelp" placeholder="Pickup City Name"
                                        name='Pcity'
                                        onChange={(e) => setaddress((prev) => ({ ...prev, Pcity: e.target.value }))}
                                    />
                                </div>

                                <div className="form-group p-3 ">
                                    <input type="AIQRank" className="form-control" id="AIQRank" aria-describedby="emailHelp" placeholder="DropOff City Name"
                                        name='Dcity'
                                        onChange={(e) => setaddress((prev) => ({ ...prev, Dcity: e.target.value }))}
                                    />
                                </div>

                                <div className="form-group p-3 ">
                                    <input type="AIQRank" className="form-control" id="AIQRank" aria-describedby="emailHelp" placeholder="Pickup Address Pin code"
                                        name='Ppincode'
                                        onChange={(e) => setaddress((prev) => ({ ...prev, Ppincode: e.target.value }))}
                                    />
                                </div>

                                <div className="form-group p-3 ">
                                    <input type="AIQRank" className="form-control" id="AIQRank" aria-describedby="emailHelp" placeholder="DropOff Address Pin code "
                                        name='Dpincode'
                                        onChange={(e) => setaddress((prev) => ({ ...prev, Dpincode: e.target.value }))}
                                    />
                                </div>

                                <div className="form-group p-3 ">
                                    <input type="date" className="form-control" id="AIQRank" aria-describedby="emailHelp" placeholder="Pickup Date"
                                        name='date'
                                        onChange={(e) => setaddress((prev) => ({ ...prev, date: e.target.value }))}
                                    />
                                </div>

                                <div className="form-group p-3 ">
                                    <input type="AIQRank" className="form-control" id="AIQRank" aria-describedby="emailHelp" placeholder="Name (Optional) "
                                        name='name'
                                        onChange={(e) => setaddress((prev) => ({ ...prev, name: e.target.value }))}
                                    />
                                </div>

                                <div className="form-group p-3 ">
                                    <input type="AIQRank" className="form-control" id="AIQRank" aria-describedby="emailHelp" placeholder="Phone Number (Optional) " name='phone'
                                        onChange={(e) => setaddress((prev) => ({ ...prev, phone: e.target.value }))}
                                    />
                                </div>

                                <div className="form-group p-3 ">
                                    <select class="form-select" aria-label="Default select example"
                                        name='Req'
                                        onChange={(e) => setaddress((prev) => ({ ...prev, Req: e.target.value }))}
                                    >
                                        <option selected>Choose</option>
                                        <option value="Personal">Personal</option>
                                        <option value="Business">Business</option>
                                    </select>
                                </div>
                            </div>

                            <div className='formbutton text-center my-4'>
                                <a type="submit" onClick={handleSaved} className="btn-sub">Submit</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div id="saveModal" className="modal">
                <div className="modal-content">
                    <span><FaRegThumbsUp /></span>
                    <h2>Your Are sure to Save It !</h2>
                    <div className='btn-modalm my-4'>
                        <button className='btn-view mx-4 ' onClick={CloseModal} >Close</button>
                        <button className='btn-view mx-4 ' onClick={handleVerified} >Submit</button>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Cart
