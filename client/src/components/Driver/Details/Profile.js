import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Profile = ({ data, setData, setAddress, setProfile }) => {
    
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
        if (data.name === '' || data.lname === '' || data.phone === '' || data.email === "" || data.DOB === "" || data.AdharNumber === "" || data.PanCardNumber === "" || data.gender === "") {
            toast("Please fill all the Details", {
                autoClose: 1000,
            })
            setAddress(false);
            setProfile(true);
        } else {
            setAddress(true);
            setProfile(false);
            toast("Your Data Saved Successfully", {
                autoClose: 1000,
            })
        }
    }

    return (
        <>
            <div className='profileDriver' >
                <h6>Profile Details </h6>
                <small>Let us know about you to suggest the best for you.</small>

                <form>
                    <div class="form-group">
                        <input type="name" class="form-control"  name='name' value={data.name}  placeholder="First Name" onChange={setVal} required />
                    </div>
                    <div class="form-group">
                        <input type="lname" name='lname' value={data.lname} class="form-control" id="lname" placeholder="Last Name" onChange={setVal} />
                    </div>

                    <div class="form-group ">
                        <select id="inputState" name='gender' value={data.gender} class="form-control" onChange={setVal} >
                            <option selected>Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <input type="DOB" name='DOB' value={data.DOB} class="form-control" id="email" placeholder="Date of Brith" onChange={setVal} />
                    </div>

                    <div class="form-group">
                        <input type="email" name='email' value={data.email} class="form-control" id="email"  placeholder="Email" onChange={setVal} />
                    </div>
                    <div class="form-group">
                        <input type="phone" name='phone' value={data.phone} class="form-control" id="phone" placeholder="Phone Number" onChange={setVal} />
                    </div>

                    <div class="form-group">
                        <input type="AdharNumber" name='AdharNumber' value={data.AdharNumber} class="form-control" id="AdharNumber"  placeholder="Adhar Card Number" onChange={setVal} />
                    </div>
                    <div class="form-group">
                        <input type="pcNumber" name='PanCardNumber' value={data.PanCardNumber} class="form-control" id="PanCardNumber" placeholder="Pan Card Number" onChange={setVal} />
                    </div>

                    <div>
                        <Link type="submit" to={'/driver'} class="btn btn-profile mx-2 my-3" >Cancel</Link>
                        <button type="submit" class="btn btn-profile my-3" onClick={fun}>Save</button>
                    </div>
                </form>

            </div>
        <ToastContainer />
        </>
    )
}

export default Profile
