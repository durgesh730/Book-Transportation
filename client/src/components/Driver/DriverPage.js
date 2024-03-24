import React, { useEffect, useState } from 'react'
import '../../style/driver.css'
import Navbar from '../Navbar'
import Search from '../Search'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import driverContext from '../useContext/driverContext'
import { GoVerified } from 'react-icons/go';
import Footer from '../User/Footer'

const DriverPage = () => {
    const context = useContext(driverContext);
    const { getData, handleVehicleDriver, data } = context;
    const [driverName, setcityName] = useState();
    var len = data?.length;

    const handleSearch = () => {
        handleVehicleDriver(driverName);
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <Navbar />
            <div className='container durgeshdriver '>
                <Search handleSearch={handleSearch} setcityName={setcityName} placeholder={"Search by Driver Name"} />
                <h6>Added Details </h6>

                {len === 0 || len === undefined ? (
                    <>
                        <div class="loader my-4 "></div>
                        {/* <div className='text-center' >
                            <h5> Currently Loading Your Data Plz Wait <br /> Or Add new Data</h5>
                        </div> */}
                    </>
                ) : (

                    <div className='vehicleInfo'>
                        {
                            data?.map((item, index) => {
                                return (
                                    <>
                                        <div key={index} className="card my-2 ">
                                            <div className="card-body">
                                                <img src={item.VehicleImage} alt='img' />
                                                <div className='TransName' >
                                                    <small className="card-title">{item.transName}</small>
                                                </div>

                                                <div className='verified' >
                                                    <small>{item.isVerified === true ?
                                                        <>
                                                            <GoVerified /> "Verified"
                                                        </>
                                                        :
                                                        "Not Verified"}</small>
                                                </div>

                                                <div className='loadCapacity d-flex justify-content-between '>
                                                    <div>
                                                        <small  className="card-link">Loading Capacity</small>
                                                    </div>
                                                    <div>
                                                        <small  className=" mx-3 ">{item.lodingCapacity} Ton </small>
                                                    </div>
                                                </div>

                                                <div className='loadCapacity d-flex justify-content-between'>
                                                    <div>
                                                        <small  className="card-link">Base Fare</small>
                                                    </div>
                                                    <div>
                                                        <small  className=" mx-3 ">{item.basefare} Rs/km</small>
                                                    </div>
                                                </div>

                                                <div className='loadCapacity d-flex justify-content-between'>
                                                    <div>
                                                        <small className="card-link">Driver Name</small>
                                                    </div>
                                                    <div>
                                                        <small  className=" mx-3 ">{item.name} {item.lname} </small>
                                                    </div>
                                                </div>

                                                <div className='buttons text-center d-flex justify-content-between my-2 ' >
                                                    <NavLink to={'/editdetails'} state={item} className=' btn-card' exact >Edit</NavLink>
                                                    <NavLink to={'/viewdetails'} state={item} className=' btn-card' exact>View</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                )
                }
            </div>

            <div className='showMore' >
                <button className='btn-more'>More</button>
            </div>

            <Footer/>
        </>
    )
}

export default DriverPage
