import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Navbar'
import '../../style/cities.css'
import '../../style/admin.css'
import Search from '../Search'
import driverContext from '../useContext/driverContext'
import Footer from '../User/Footer'
import { FaRegThumbsUp } from 'react-icons/fa';

const Cities = () => {

  const context = useContext(driverContext);
  const { Addcities, Deletecities, GetAllCities,
    GetAllCity, SearchByCity } = context;

  const [cityName, setcityName] = useState();
  const [city, setCity] = useState();
  const [id, setId] = useState();
  const [del, setDel] = useState();

  const handleInputs = () => {
    setDel();
    document.getElementById("Modal").style.display = "block";
  }

  const CloseModal = () => {
    document.getElementById("Modal").style.display = "none";
    document.getElementById("inputModal").style.display = "none";
  }

  const handleSearch = () => {
    SearchByCity(cityName);
  }

  const handleSubmit = () => {
    if (del === 2) {
      Deletecities(id)
      CloseModal();
      GetAllCities();
      setDel()
    } else {
      Addcities(city);
      CloseModal();
      GetAllCities();
    }
  }

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
      onchange: handleChange,
      onSet: changeValue
    }
  }

  const newCity = useInputs('');

  const handleEdit = (item) => {
    document.getElementById("inputModal").style.display = "block";
    newCity.onSet(item.city);
  }

  const handleSave = () => {
    document.getElementById("inputModal").style.display = "none";
  }


  const handleDeleted = (id, num) => {
    setDel(num)
    setId(id);
    document.getElementById("Modal").style.display = "block";
    GetAllCities()
  }

  useEffect(() => {
    GetAllCities();
  }, [])

  return (
    <>
      <Navbar />
      <div className='container'>
        <Search placeholder={"by City"} setcityName={setcityName} handleSearch={handleSearch} />
        <div className='cities-table'>

          <div className='add-cities' >
            <button onClick={() => handleInputs(1)} className='btn-cities' >Add New Cities</button>
          </div>

          <table>
            <tr>
              <td >S.No</td>
              <td>cities name</td>
            </tr>
            {GetAllCity?.length === 0 || GetAllCity === undefined ?
              <div class="loader my-4 "></div> :
              GetAllCity?.map((item, index) => {
                return (
                  <>
                    <tr key={index} >
                      <td>{index + 1}</td>
                      <td >{item.city}</td>
                      <td ><button className='btn-view' onClick={() => handleEdit(item)} >Edit</button></td>
                      <td ><button className='btn-view' onClick={() => handleDeleted(item._id, 2)}>Delete</button></td>
                    </tr>
                  </>
                )
              })
            }
          </table>
        </div>
      </div>

      {/* = =============== modal =============== */}

      <div id="Modal" class="modal">
        <div class="modal-content">
          <div className='modalinput'>
            {del === 2 ?
              <>
                <span><FaRegThumbsUp /></span>
                <h2>Your Are sure to Delete It !</h2>
              </> :
              <input type='text' placeholder='Enter City'
                onChange={(e) => { setCity((prev) => ({ ...prev, city: e.target.value })) }}
              />
            }
          </div>

          <div className='btn-modalm my-4'>
            <button className='btn-view mx-4 ' onClick={CloseModal} >Close</button>
            <button className='btn-view mx-4 ' onClick={handleSubmit} >Submit</button>
          </div>
        </div>
      </div>

      <div id="inputModal" class="modal">
        <div class="modal-content">
          <div className='modalinput'>
            <input type='text' placeholder='Enter City'
              value={newCity.value}
              onChange={newCity.onchange}
            />
          </div>

          <div className='btn-modalm my-4'>
            <button className='btn-view mx-4 ' onClick={CloseModal} >Close</button>
            <button className='btn-view mx-4 ' onClick={handleSave} >Save</button>
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

export default Cities
