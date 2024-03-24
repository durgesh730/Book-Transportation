import Navbar from '../Navbar'
import Footer from './Footer'
import React, { useEffect, useState } from 'react'
import { FaRegThumbsUp } from 'react-icons/fa';
import { useContext } from 'react';
import driverContext from '../useContext/driverContext';

const DelVehicle = () => {

    const context = useContext(driverContext)
    const { data, getData, DeleteDrivers } = context;
    const [VerifyId, setVerify] = useState();

    function handleOpenModal(id) {
        document.getElementById("Modal").style.display = "block";
        setVerify(id);
    }

    function CloseModal() {
        document.getElementById("Modal").style.display = "none";
    }

    const handleDelete = () => {
        DeleteDrivers(VerifyId)
        CloseModal();
        getData();
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <Navbar />
            <div className='container'>
                <div className='tableVerified verified'>
                    <table>
                        <tr className='my-4' >
                            <td>S.No</td>
                            <td>Driver Name</td>
                            <td>Vehicle Number</td>
                        </tr>

                        {data.length === 0 | data === undefined ?
                            <div class="loader my-4 "></div> :
                            data.map((item, index) => {
                                return (
                                    <tr key={index} className='trtd' >
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.Vnamber}</td>
                                        <td><button className='btn-delete' onClick={() => { handleOpenModal(item._id) }} >Delete</button></td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>
            </div>

            {/* modal  */}

            <div id="Modal" className="modal">
                <div className="modal-content">
                    <span><FaRegThumbsUp /></span>
                    <h2>Your Are sure to Delete It !</h2>
                    <div className='btn-modalm my-4'>
                        <button className='btn-view mx-4 ' onClick={CloseModal} >Close</button>
                        <button className='btn-view mx-4 ' onClick={handleDelete} >Submit</button>
                    </div>
                </div>
            </div>

            <div className='showMore' >
                <button className='btn-more'>More</button>
            </div>

            <Footer />

        </>
    )
}

export default DelVehicle
