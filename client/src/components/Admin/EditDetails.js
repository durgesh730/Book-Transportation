import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import { useContext } from 'react';
import driverContext from '../useContext/driverContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


const EditDetails = () => {

  const context = useContext(driverContext);
  const { editData } = context;
  const [profile, setProfile] = useState(true);
  const [Vaddress, setAddress] = useState(false);
  const [vehicle, setVehicle] = useState(false);
  const [uploaddoc, setUploaddoc] = useState(false);
  const location = useLocation();
  const item = location.state;
  const id = item._id

  const useInputs = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const handleChange = (e) => {
      setValue(e.target.value);
    };

    const changeValue = (v) => {
      setValue(v);
    }
    return {
      value,
      onChange: handleChange,
      onSet: changeValue
    }
  }

  const name = useInputs('');
  const lname = useInputs('');
  const gender = useInputs('');
  const DOB = useInputs('');
  const email = useInputs('');
  const phone = useInputs('');
  const PanCardNumber = useInputs('');
  const address = useInputs('');
  const city = useInputs('');
  const state = useInputs('');
  const pincode = useInputs('');
  const country = useInputs('');
  const basefare = useInputs('')
  const bodysize = useInputs('')
  const lodingCapacity = useInputs('')
  const transName = useInputs('')
  const Vnamber = useInputs('');
  const RCnumber = useInputs('')
  const DLnumber = useInputs('')
  const PolutionCertificate = useInputs('')
  const driverImage = useInputs('')
  const VehicleImage = useInputs('')
  const DLImage = useInputs('')
  const RCImage = useInputs('')

  useEffect(() => {
    name.onSet(item.name)
    lname.onSet(item.lname)
    gender.onSet(item.gender)
    DOB.onSet(item.DOB)
    email.onSet(item.email)
    phone.onSet(item.phone)
    PanCardNumber.onSet(item.PanCardNumber);
    address.onSet(item.address)
    city.onSet(item.city)
    state.onSet(item.state)
    pincode.onSet(item.pincode)
    country.onSet(item.country)
    basefare.onSet(item.basefare)
    bodysize.onSet(item.bodysize)
    lodingCapacity.onSet(item.lodingCapacity)
    transName.onSet(item.transName)
    Vnamber.onSet(item.Vnamber)
    DLnumber.onSet(item.DLnumber)
    RCnumber.onSet(item.RCnumber)
    PolutionCertificate.onSet(item.PolutionCertificate)
    driverImage.onSet(driverImage)
    VehicleImage.onSet(VehicleImage)
    DLImage.onSet(DLImage)
    RCImage.onSet(RCImage)
  }, [])

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

  const handlesave = (e) => {
    e.preventDefault()
    editData(id, name.value, lname.value, gender.value, DOB.value, email.value, phone.value,
      PanCardNumber.value, address.value, city.value, state.value, pincode.value, Vnamber.value,
      country.value, basefare.value, bodysize.value, lodingCapacity.value, transName.value,
      RCnumber.value, DLnumber.value, PolutionCertificate.value, driverImage.value,
      VehicleImage.value, DLImage.value, RCImage.value)
    toast("Your Data Edited Successfully", {
      autoClose: 1000,
    })
  }

  return (
    <>

      <Navbar />
      <div className='container'>
        <div className='ManageBoth' >
          <div className='vehicleimg' >
            <img src={`${location.state?.driverImage}`} alt="img" /><br />
            <div className='text-center my-2 ' >
              <span  >{location.state?.name}</span>
            </div>
            <img src={`${location.state?.VehicleImage}`} className='my-4' alt="img" /><br />

            <div className='text-center my-2 ' >
              <span  >{location.state?.transName}</span>
            </div>
            <div className='imagesText'>
              <span >Your Information is secrued <br /> not public thanks for your Trust</span>
            </div>
          </div>
          <div className='Alldetails' >
            <div className='transName my-2 '>
              <span>{location.state?.transName}</span>
            </div>
            <div className='smallnav'>
              <small onClick={handlesetPage} >Profile Details</small>
              <small onClick={handlesetProfile} >Address Details</small>
              <small onClick={handleVehicle} >Vehicle Details</small>
              <small onClick={handleDocument} >Documents Details</small>
            </div>

            {
              profile === true ? (
                <>

                  <div className='showprofile' >
                    <h6 className='my-4' >Personal Details</h6>
                    <div className='personal' >
                      <div class="form-group">
                        <input type="name" class="form-control" id="name" name='name' value={name.value} aria-describedby="emailHelp" placeholder="First Name" onChange={name.onChange} required />
                      </div>
                      <div class="form-group">
                        <input type="lname" name='lname' value={lname.value} class="form-control mx-2" id="lname" placeholder="Last Name" onChange={lname.onChange} />
                      </div>

                      <div class="form-group ">
                        <select id="inputState" name='gender' value={gender.value} class=" mx-3 form-control" onChange={gender.onChange} >
                          <option selected>Gender</option>
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                      </div>

                    </div>

                    <div className='my-2 gender ' >
                      <div class="form-group">
                        <input type="DOB" name='DOB' value={DOB.value} class=" form-control" id="email" aria-describedby="emailHelp" placeholder="Date of Brith" onChange={DOB.onChange} />
                      </div>
                    </div>

                    <h6 className='my-4' >Contect Details</h6>
                    <div className='contect' >
                      <div class="form-group">
                        <input type="email" name='email' value={email.value} class="form-control" id="email" aria-describedby="emailHelp" placeholder="Email" onChange={email.onChange} />
                      </div>
                      <div class="form-group">
                        <input type="phone" name='phone' value={phone.value} class="form-control mx-2 " id="phone" placeholder="Phone Number" onChange={phone.onChange} />
                      </div>
                    </div>
                  </div>

                  <div className='my-4 text-center ' >
                    <button onClick={handlesetProfile} className='save-btn'>Next</button>
                  </div>

                </>
              ) : ("")
            }

            {
              Vaddress === true ? (
                <>

                  <div className='addressSection'>

                    <div class="form-group">
                      <textarea type="address" name='address' value={address.value} class="form-control" id="adress" aria-describedby="emailHelp" placeholder="Address" onChange={address.onChange} />
                    </div>

                    <div className='locationDetails' >
                      <div class="form-group">
                        <input type="city" name='city' value={city.value} class="form-control" id="city" placeholder="City" onChange={city.onChange} />
                      </div>

                      <div class="form-group">
                        <input type="state" name='state' value={state.value} class="mx-2 form-control" id="state" aria-describedby="emailHelp" placeholder="State" onChange={state.onChange} />
                      </div>

                      <div class="form-group">
                        <input type="pincode" name='pincode' value={pincode.value} class="form-control mx-3 " id="pincode" aria-describedby="emailHelp" placeholder="Pin Code" onChange={pincode.onChange} />
                      </div>

                    </div>

                    <div class="form-group">
                      <input type="country" name='country' value={country.value} class="form-control my-4 " id="country" placeholder="Country" onChange={country.onChange} />
                    </div>
                  </div>

                  <div className='my-4 text-center ' >
                    <button onClick={handleVehicle} className='save-btn'>Next</button>
                  </div>
                </>
              ) : ('')
            }

            {
              vehicle === true ? (
                <>
                  <div className='Vehicle' >
                    <div class="form-group">
                      <input type="basefare" name='basefare' value={basefare.value} class="form-control" id="basefare" aria-describedby="emailHelp" placeholder="Base Fare(Rent)" onChange={basefare.onChange} />
                    </div>
                    <div class="form-group">
                      <input type="lodingCapacity" name='lodingCapacity' value={lodingCapacity.value} class="form-control" id="lodingCapacity" placeholder="Loding Capacity" onChange={lodingCapacity.onChange} />
                    </div>

                    <div class="form-group">
                      <input type="bodysize" name='bodysize' value={bodysize.value} class="form-control" id="email" aria-describedby="emailHelp" placeholder="Load Body Size" onChange={bodysize.onChange} />
                    </div>
                    <div class="form-group">
                      <input type="tarnsName" name='transName' value={transName.value} class="form-control" id="tarnsName" placeholder="Your Transportation Name" onChange={transName.onChange} />
                    </div>

                    <div class="form-group">
                      <input type="vNumber" name='Vnamber' value={Vnamber.value} class="form-control" id="vNumber" aria-describedby="emailHelp" placeholder="Vehile Number" onChange={Vnamber.onChange} />
                    </div>
                    <div class="form-group">
                      <input type="DLnumber" name='DLnumber' value={DLnumber.value} class="form-control" id="DLnumber" placeholder="Driving License Number" onChange={DLnumber.onChange} />
                    </div>

                    <div class="form-group">
                      <input type="Rcnumber" name='RCnumber' value={RCnumber.value} class="form-control" id="Rcnumber" placeholder="RC Number" onChange={RCnumber.onChange} />
                    </div>

                    <div className='my-2' >
                      <label class="form-check-label" for="flexRadioDefault1">You have Polution Certificate</label>
                      <div class="form-check">
                        <input class="form-check-input" name='Polutioncertificate' value={PolutionCertificate.value} type="radio" id="1" onChange={PolutionCertificate.onChange} />
                        <label class="form-check-label" for="flexRadioDefault1">
                          Yes
                        </label>
                      </div>
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name='Polutioncertificate' value={PolutionCertificate.value} id="2" checked onChange={PolutionCertificate.onChange} />
                        <label class="form-check-label" for="flexRadioDefault2">
                          No
                        </label>
                      </div>
                    </div>

                    {/* <div>
                      <span>Polution Certificate</span><br />
                      <small>{location.state?.PolutionCertificate ? "Yes" : "No"}</small>
                    </div> */}
                  </div>

                  <div className='my-4 text-center ' >
                    <button onClick={handleDocument} className='save-btn'>Next</button>
                  </div>
                </>
              ) : ("")
            }


            {
              uploaddoc === true ? (
                <>
                  <div className='ImagesUpload'>
                    <div class="mb-3">
                      <label for="formFile" class="form-label">Driver Image</label>
                      <input class="form-control" type="file" id="formFile" />
                    </div>

                    <div class="mb-3">
                      <label for="formFile" class="form-label">Vehicle Image</label>
                      <input class="form-control" type="file" id="formFile" />
                    </div>

                    <div class="mb-3">
                      <label for="formFile" class="form-label">DL Image/PDF</label>
                      <input class="form-control" type="file" id="formFile" />
                    </div>

                    <div class="mb-3">
                      <label for="formFile" class="form-label">RC Image/PDF</label>
                      <input class="form-control" type="file" id="formFile" />
                    </div>
                  </div>

                  <div className='my-4 text-center ' >
                    <button onClick={handlesave} className='save-btn'>Save</button>
                  </div>
                </>
              ) : ('')
            }

          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default EditDetails
