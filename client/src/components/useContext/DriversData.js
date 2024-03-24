import React, { useState } from 'react'
import driverContext from './driverContext'
import axios from 'axios'
import { serverhost } from '../../host'

const DriversData = (props) => {

  const host = `${serverhost}/driver`
  const Userhost = `${serverhost}/user`
  const adminhost = `${serverhost}/admin`
  const citieshost = `${serverhost}/city`
  const commenthost = `${serverhost}/comment`

  const [data, setData] = useState([]);
  const [alldata, setAllData] = useState([]);
  const [UpcomingOtp, setOtp] = useState();
  const [UserName, setUserName] = useState([])
  const [GetAllCity, setgetAllcity] = useState();

  // const [moTrucks, setmoTrucks] = useState();
  // const [ontruks, setOntrucks] = useState();

  const [getveh_id, setGetVeh] = useState();
  const [OneData, setOneData] = useState();
  const [Address, setaddress] = useState({
    pickupAddress: "",
    Ppincode: "",
    Pcity: "",
    DropOffAddress: "",
    Dpincode: "",
    Dcity: "",
    driverId: "",
    name: "",
    Req: "",
    phone: ""
  });
  const VehicleId = OneData?._id;
  const driverId = OneData?.driverId;

  const [booked, setBooked] = useState();
  const [allcities, setCities] = useState();

  // { vehicle data according users }

  const getData = async () => {
    const response = await fetch(`${host}/vehiclesData`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem("token")
      },
    });
    const json = await response.json();
    setData(json.data);
  }

  // get all vehicle data 

  const getallData = async () => {
    const response = await fetch(`${host}/allvehiclesData`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const json = await response.json();
    setAllData(json.data);
  }

  // edit driver data

  const editData = async (id, name, lname, gender, DOB, email,
    phone, PanCardNumber, address, city, state, pincode, Vnamber,
    country, basefare, bodysize, lodingCapacity, transName,
    RCnumber, DLnumber, PolutionCertificate, driverImage,
    VehicleImage, DLImage, RCImage) => {
    const response = await fetch(`${host}/editedData/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name, lname, gender, DOB, email, phone,
        PanCardNumber, address, city, state, pincode, Vnamber,
        country, basefare, bodysize, lodingCapacity, transName,
        RCnumber, DLnumber, PolutionCertificate, driverImage,
        VehicleImage, DLImage, RCImage
      })
    })
    const json = await response.json();
  }

  // edit users profile data

  const editUserProfiledata = async (id, username, email, phone, link) => {
    const response = await fetch(`${Userhost}/editUserProfiledata/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username, email, phone, link
      })
    })
    const json = await response.json();
  }

  // generate otp at signup time

  const generateOTPAtSignup = async (email) => {
    const response = await fetch(`${Userhost}/generateOTPAtSignup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email })
    })
    const json = await response.json();
    setOtp(json)
    if (json.code) {
      let text = ` Your OTP is ${json.code} . for email verification.`;
      await axios.post(`${Userhost}/sendMail`, { email, text, subject: "For Signup" })
      return Promise.resolve(json.code);
    } else {
      return Promise.reject("error")
    }
  }

  // generate otp at resetPassword time

  const generateOTP = async (email) => {
    const response = await fetch(`${Userhost}/generateOTP`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email })
    })
    const json = await response.json();
    setOtp(json)
    if (json.code) {
      let text = ` Your Password OTP is ${json.code} . Verify and recover your password.`;
      await axios.post(`${Userhost}/sendMail`, { email, text, subject: "Password Reset" })
      return Promise.resolve(json.code);
    } else {
      return Promise.reject("error")
    }
  }

  // reset password

  const resetPassword = async (email, password) => {
    try {
      const { data, status } = await axios.put(`${Userhost}/resetPasword`, { email, password })
      return Promise.resolve({ data, status })
    } catch (error) {
      return Promise.reject({ error })
    }
  }

  // verified the the vehicles 

  const ChangeIsVerified = async (isVerified, id) => {
    try {
      const data = await axios.put(`${adminhost}/changeisVerified/${id}`, { isVerified })
      getallData();
      console.log(data.data)
      return Promise.resolve(data.data)
    } catch (error) {
      return Promise.reject({ error })
    }
  }

  // users data from user collections

  const UsersDataBYId = async (id) => {
    try {
      const res = await axios.get(`${adminhost}/UserDataAtAdmin/${id}`)
      setUserName(res.data);
      return Promise.resolve(res);
    } catch (error) {
      return Promise.reject({ error })
    }
  }

  // add cities in database

  const Addcities = async (city) => {
    try {
      const cities = await axios.post(`${citieshost}/cities`, { city })
      return Promise.resolve(cities);
    } catch (error) {
      return Promise.reject({ error })
    }
  }

  // delete cities from database

  const Deletecities = async (id) => {
    try {
      const cities = await axios.delete(`${citieshost}/OnebyOnecities/${id}`)
      return Promise.resolve(cities);
    } catch (error) {
      return Promise.reject({ error })
    }
  }

  // Get all cities from database

  const GetAllCities = async () => {
    try {
      const allcities = await axios.get(`${citieshost}/allcities`)
      setgetAllcity(allcities.data)
      return Promise.resolve(allcities);
    } catch (error) {
      return Promise.reject({ error })
    }
  }

  // delete cities from database

  const DeleteDrivers = async (id) => {
    try {
      const drivers = await axios.delete(`${adminhost}/driversAndTrucks/${id}`)
      getallData();
      return Promise.resolve(drivers);
    } catch (error) {
      return Promise.reject({ error })
    }
  }

  // const getMOVERSTRUCKS = async () => {
  //   const response = await fetch(`${host}/VehData`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //   const json = await response.json();
  //   setmoTrucks(json);
  // }

  // const gettruksTrans = async () => {
  //   const response = await fetch(`${host}/VehNext`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //   const json = await response.json();
  //   setOntrucks(json);
  // }

  // booking user data add to database

  const AddAddress = async () => {
    try {
      const addressData = await axios.post(`${Userhost}/BookedAddress`, { Address, VehicleId, driverId },
        {
          headers: {
            "token": localStorage.getItem("token")
          },
        }
      )
      return Promise.resolve(addressData);
    } catch (error) {
      return Promise.reject({ error })
    }
  }

  // get booked vehicles data from database according to users

  const getbookedVehicles = async () => {
    const response = await fetch(`${Userhost}/bookedVehicles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem("token")
      },
    })
    const json = await response.json();
    setBooked(json);
  }

  // get all booked vehicles data  

  const getbookedAdminSide = async () => {
    const response = await fetch(`${adminhost}/bookedVehiclesAdmin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const json = await response.json();
    setBooked(json);
  }

  // save comments

  const SavedComment = async (comment) => {
    const res = await fetch(`${commenthost}/SavedComments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem("token")
      },
      body: JSON.stringify({ comment })
    })
    const data = await res.json();
  }

  // change vehicle status to booked

  const ChangeBooked = async (Booked, id) => {
    const res = await fetch(`${Userhost}/ChangeVehicleStatus/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ Booked })
    })
    const data = await res.json();
    getbookedAdminSide();
    // setBooked(data)
    // console.log(data, "on cancel");
  }

  // Get all cities 

  const Allcityhandle = async () => {
    const res = await fetch(`${citieshost}/allcities`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json();
    setCities(data)
  }

  // search vehicle by city name

  const handleSearchVehicle = async (query) => {
    const data = await fetch(`${host}/searchVehicle?city=${query.cityName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data.json();
    setAllData(res)
  };

  // search by driver name

  const handleVehicleDriver = async (query) => {
    const data = await fetch(`${host}/searchVehDriver?name=${query.driverName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data.json();
    setData(res)
    setAllData(res);
  };

  // get booked vehicles according to drivers 

  const getbookedDriverSide = async () => {
    const response = await fetch(`${host}/bookedVehiclesDriver`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem("token")
      },
    })
    const json = await response.json();
    setBooked(json);
  }

  // Get vehicles by their id 

  const GetVehicleBy_id = async (id) => {
    try {
      const veh = await axios.get(`${host}/Vehicleby_id/${id}`)
      setGetVeh(veh.data);
      return Promise.resolve(veh);
    } catch (error) {
      return Promise.reject({ error })
    }
  }

  //serach by transportation name

  const SearchByTransName = async (query) => {
    try {
      const data = await axios.get(`${adminhost}/BytransName?transName=${query.driverName}`)
      setAllData(data.data)
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject({ error })
    }
  }

  // search according to city

  const SearchByCity = async (query) => {
    try {
      const data = await axios.get(`${adminhost}/ByCityName?city=${query.driverName}`)
      setgetAllcity(data.data)
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject({ error })
    }
  }

  // Change Vehicle  status

  const ChangeBookState = async (Booked, id) => {
    const res = await fetch(`${host}/ChangeVehicleState/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ Booked })
    })
    const data = await res.json();
  }

  // send mail to driver when user book vehicles

  const sendNotification = async ({ email, Address }) => {
    let pickupAddress = Address.pickupAddress
    let pickupCity = Address.Pcity
    let DropOffAddress = Address.DropOffAddress
    let DropOffCity = Address.Dcity
    let BookingDate = Address.date
    try {
      let text = ` Your Vehicle booked successfully 
              Details :
              pickupAddress: ${pickupAddress}, pickupCity: ${pickupCity}, DropOffAddress: ${DropOffAddress}, DropOffCity: ${DropOffCity}, BookingDate: ${BookingDate}`;
      let data = await axios.post(`${Userhost}/sendMail`, { email, Address, text, subject: "Vehicle Details" })
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject({ error })
    }
  }

  // delete cities from database

  const DeleteBookedVehicles = async (id) => {
    try {
      const drivers = await axios.delete(`${adminhost}/deleteBookedVehicles/${id}`)
      getbookedAdminSide();
      console.log(drivers)
      return Promise.resolve(drivers);
    } catch (error) {
      return Promise.reject({ error })
    }
  }

  return (
    <driverContext.Provider value={{
      UpcomingOtp, data, generateOTPAtSignup, Deletecities, DeleteBookedVehicles,
      alldata, getData, getallData, editData, GetAllCities, DeleteDrivers,
      SavedComment, generateOTP, resetPassword, ChangeIsVerified, GetAllCity,
      handleVehicleDriver, getbookedDriverSide, GetVehicleBy_id,
      ChangeBooked, Allcityhandle, allcities, handleSearchVehicle, getbookedAdminSide,
      editUserProfiledata, UsersDataBYId, UserName, Addcities, setOneData, Address,
      setaddress, OneData, AddAddress, getbookedVehicles, booked
      , getveh_id, SearchByTransName, SearchByCity, ChangeBookState, sendNotification
    }} >
      {props.children}
    </driverContext.Provider>
  )
}

export default DriversData;
