import React, { useContext, useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './User/Footer'
import { useLocation } from 'react-router-dom'
import driverContext from './useContext/driverContext'
import { FaRegHandPointRight } from 'react-icons/fa';

const UserBook = () => {
    const context = useContext(driverContext)
    const { GetVehicleBy_id, getveh_id } = context
    const location = useLocation();
    const data = location.state?.item;

    useEffect(() => {
        GetVehicleBy_id(data)
    }, [data])

    return (
        <>
            <Navbar />
            <div className='container' >
                <div className='userbook'>
                    <div>
                        <span>Transportation Name</span><br />
                        <small>{getveh_id?.transName ? getveh_id?.transName : "Not Available"}</small>
                    </div>
                    <div>
                        <span>Driver Name</span><br />
                        <small>{getveh_id?.name ? getveh_id?.name : "Not Available"} {getveh_id?.lname}</small>
                    </div>
                    <div>
                        <span>Phone Number</span><br />
                        <small>{getveh_id?.phone ? getveh_id?.phone : "Not Available"}</small>
                    </div>
                    <div>
                        <span>Vehicle Number</span><br />
                        <small>{getveh_id?.Vnamber ? getveh_id?.Vnamber : "Not Available"}</small>
                    </div>
                    <div>
                        <span>Loding Capacity</span><br />
                        <small>{getveh_id?.lodingCapacity ? <> {getveh_id?.lodingCapacity} Ton </> : "Not Available"}</small>
                    </div>
                    <div>
                        <span>Fare Base</span><br />
                        <small>{getveh_id?.basefare ? <> {getveh_id?.basefare} Rs/km </> : "Not Available"}</small>
                    </div>
                </div>
            </div>

            <div className='container' style={{ fontSize: "1rem", paddingBottom: "4rem" }} >
                <h5 className='handicon'>Note</h5>
                <div className='notesforuser'>
                    <span>
                        <small className='handicon' style={{ fontSize: "1.5rem", }}>
                            <FaRegHandPointRight />
                        </small> As a transportation service providers, we do not oversee the payment process. It is the responsibility of the driver and the user to communicate with each other and agree upon the payment method, including timing and cash on delivery options. </span><br />
                    <span>
                        <small className='handicon' style={{ fontSize: "1.5rem", }} >
                            <FaRegHandPointRight />
                        </small>The Total Fare Base for your trip will be determined by multiplying the number of kilometers traveled by the vehicle with the Fare Base per kilometer.</span><br />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default UserBook
