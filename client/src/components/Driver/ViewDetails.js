import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { useLocation, Link } from 'react-router-dom';
import driverContext from '../useContext/driverContext';

const ViewDetails = () => {
    const context = useContext(driverContext);
    const { UsersDataBYId} = context;

    const [profile, setProfile] = useState(true);
    const [address, setAddress] = useState(false);
    const [vehicle, setVehicle] = useState(false);
    const [uploaddoc, setUploaddoc] = useState(false);

    const location = useLocation()
    const driverData = location.state;

    const handlesetPage = (e) => {
        e.preventDefault();
        setProfile(true);
        setAddress(false);
        setVehicle(false);
        setUploaddoc(false);
    }

    const handlesetProfile = (e) => {
        e.preventDefault();
        setProfile(false);
        setAddress(true);
        setVehicle(false);
        setUploaddoc(false);
    }

    const handleVehicle = (e) => {
        e.preventDefault();
        setProfile(false);
        setAddress(false);
        setVehicle(true);
        setUploaddoc(false);
    }

    const handleDocument = (e) => {
        setProfile(false);
        setAddress(false);
        setVehicle(false);
        setUploaddoc(true);
    }

    useEffect(() => {
        UsersDataBYId(driverData.driverId);
    }, [])

    return (
        <>
            <Navbar />
            <div className='container'>
                <div className='ManageBoth' >
                    <div className='vehicleimg' >
                        <img src={`${driverData?.driverImage}`} alt="image" /><br />
                        <div className='text-center my-2 ' >
                            <span >{driverData?.name}</span>
                        </div>
                        <img src={`${driverData?.VehicleImage}`} className='my-4' alt="image" /><br />

                        <div className='text-center my-1 ' >
                            <span >{driverData?.transName}</span>
                        </div>

                        <div className='imagesText'>
                            <span >Your Information is Secrued <br />not public thanks for your Trust</span>
                        </div>
                    </div>

                    <div className='Alldetails' >
                        <div className='transName'>
                            <span>{driverData?.transName}</span>
                        </div>
                        <div className='smallnav my-4 '>
                            <small onClick={handlesetPage} >Profile Details</small>
                            <small onClick={handlesetProfile} >Address Details</small>
                            <small onClick={handleVehicle} >Vehicle Details</small>
                            <small onClick={handleDocument} >Documents Details</small>
                        </div>

                        {profile === true ? (
                            <>
                                <div className='showprofile' >
                                    <h6 className='my-4' >Personal Details</h6>
                                    <div className='personal' >
                                        <div>
                                            <span>Name</span> <br />
                                            <small>{driverData?.name}</small>
                                        </div>

                                        <div>
                                            <span>Last Name</span> <br />
                                            <small>{driverData?.lname}</small>
                                        </div>

                                        <div>
                                            <span>Date of Brith</span> <br />
                                            <small>{driverData?.DOB}</small>
                                        </div>
                                    </div>

                                    <div className='my-2 gender ' >
                                        <span>Gender</span> <br />
                                        <small>{driverData?.gender}</small>
                                    </div>

                                    <h6 className='my-4' >Contect Details</h6>
                                    <div className='contect' >
                                        <div>
                                            <span>Phone Number</span> <br />
                                            <small>{driverData?.phone}</small>
                                        </div>
                                        <div>
                                            <span>Email Id</span> <br />
                                            <small>{driverData?.email}</small>
                                        </div>
                                    </div>
                                </div>

                                <div className='my-4 text-center ' >
                                    <button onClick={handlesetProfile} className='save-btn'>Next</button>
                                </div>
                            </>
                        ) : ("")}

                        {address === true ? (
                            <>
                                <div className='addressSection'>
                                    <div>
                                        <span>Permanent Address </span> <br />
                                        <small>{driverData?.address}</small>
                                    </div>

                                    <div className='locationDetails' >
                                        <div>
                                            <span>City</span><br />
                                            <small>{driverData?.city}</small>
                                        </div>

                                        <div>
                                            <span>State</span><br />
                                            <small>{driverData?.state}</small>
                                        </div>

                                        <div>
                                            <span>Country</span> <br />
                                            <small>{driverData?.country}</small>
                                        </div>
                                    </div>
                                    <div className='my-4' >
                                        <span>Cities</span><br />
                                        {
                                            driverData?.Scity.map((item, i) => {
                                                return (
                                                    <>
                                                        <small className='mx-2' >{i + 1}  {item.city}</small>
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                </div>

                                <div className='my-4 text-center ' >
                                    <button onClick={handleVehicle} className='save-btn'>Next</button>
                                </div>
                            </>

                        ) : ("")}

                        {vehicle === true ? (
                            <>
                                <div className='Vehicle' >
                                    <div>
                                        <span>Base Fare</span><br />
                                        <small>{driverData?.basefare}</small>
                                    </div>

                                    <div>
                                        <span>Body Size</span><br />
                                        <small>{driverData?.bodysize}</small>
                                    </div>

                                    <div>
                                        <span>Loading Capacity</span><br />
                                        <small>{driverData?.lodingCapacity}</small>
                                    </div>

                                    <div>
                                        <span>Vehicle Number</span><br />
                                        <small>{driverData?.Vnamber}</small>
                                    </div>

                                    <div>
                                        <span>DL Number</span><br />
                                        <small>{driverData?.DLnumber}</small>
                                    </div>

                                    <div>
                                        <span>RC number</span><br />
                                        <small>{driverData?.RCnumber}</small>
                                    </div>

                                    <div>
                                        <span>Polution Certificate</span><br />
                                        <small>{driverData?.PolutionCertificate ? "Yes" : "No"}</small>
                                    </div>
                                </div>

                                <div className='my-4 text-center ' >
                                    <button onClick={handleDocument} className='save-btn'>Next</button>
                                </div>
                            </>
                        ) : ("")}

                        {uploaddoc === true ? (
                            <>
                                <div className='ImagesItem'>

                                    <div>
                                        <span>Driver Photo</span><br />
                                        <a href={`${driverData?.driverImage}`} target='_blank' >View</a>
                                    </div>

                                    <div>
                                        <span>Vehicle Image</span><br />
                                        <a href={`${driverData?.VehicleImage}`} target='_blank' >View</a>
                                    </div>

                                    <div>
                                        <span>DL Image</span><br />
                                        <a href={`${driverData?.DLImage}`} target='_blank' >View</a>
                                    </div>

                                    <div>
                                        <span>RC Image</span><br />
                                        <a href={`${driverData?.RCImage}`} target='_blank' >View</a>
                                    </div>
                                </div>
                                <div className='my-4 text-center'>
                                    <Link to={"/driver"} className='save-btn'>Go to Home</Link>
                                </div>
                            </>
                        ) : ('')
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewDetails
