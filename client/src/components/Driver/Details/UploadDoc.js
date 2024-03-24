import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {  useNavigate } from 'react-router-dom';

const UploadDoc = ({ data, setData, SaveData }) => {
    const navigate =  useNavigate();
    
    const setVal = (e) => {
        const { value, name } = e.target;

        setData(() => {
            return {
                ...data,
                [name]: value
            }
        })
    }

    const fun = (e) => {
        e.preventDefault()
        if (data.driverImage === '' || data.VehicleImage === '' || data.DLImage === '' || data.RCImage === "") {
            // alert("fill all details")
            toast("Please Fill all the Details", {
                autoClose: 1000,
            })
        } else {
            SaveData();
            alert("Your Data Saved Successfully")
            // toast("Your Data Saved successfully", {
            //     autoClose: 1000,
            // })
            navigate('/driver')
        }
    }

    const handleRelocate =()=>{
        navigate('/driver')
     }

    return (
        <>

            <div className='doc' >
                <h6>Upload Documents </h6>
                <small>Let us know about you to suggest the best for you.</small>

                <div className='uploadtab'>

                    <div className='w-75 my-4 '>
                        <label class="form-label" for="customFile">Vehicle Driver Photo </label>
                        <input class="form-control" type="file" id="formFile"  name='driverImage' value={data.driverImage} onChange={setVal} />
                    </div>

                    <div className='w-75 my-4 ' >
                        <label class="form-label" for="customFile">Vehicle Image </label>
                        <input class="form-control" type="file" id="formFile"  name='VehicleImage' value={data.VehicleImage} onChange={setVal} />
                    </div>

                    <div className='w-75 my-4'>
                        <label class="form-label" for="customFile">Driving License</label>
                        <input class="form-control" type="file" id="formFile"  name='DLImage' value={data.DLImage} onChange={setVal} />
                    </div>

                    <div className='w-75 my-4'>
                        <label class="form-label" for="customFile">RC Document </label>
                        <input class="form-control" type="file" id="formFile"  name='RCImage' value={data.RCImage} onChange={setVal} />
                    </div>
                </div>

                <div>
                    <button type="submit" onClick={handleRelocate} class="btn btn-profile mx-2 my-3">Cancel</button>
                    <button type="submit" class="btn btn-profile my-3" onClick={fun} >Save</button>
                </div>
            </div>
        <ToastContainer />
        </>
    )
}

export default UploadDoc
