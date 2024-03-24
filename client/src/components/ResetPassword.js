import React, { useContext, useState } from "react";
import "../style/login.css";
import backimg from "../images/Logo.png";
import logo from "../images/Logo.png";
import { useNavigate, Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import driverContext from "./useContext/driverContext";

const Login = () => {
    const context = useContext(driverContext)
    const { resetPassword } = context;
    const email = JSON.parse(localStorage.getItem("user"));
    
    const navigate = useNavigate();
    const [values, setValues] = useState({
        password: "",
        Rpassword: "",
    });

    const handleReset = (e) => {
        e.preventDefault();
        const { password, Rpassword } = values;
        if (password === null) {
            toast("Please Fill New Password ", {
                autoClose: 1000,
            })
        } else if (password !== Rpassword) {
            toast("The Passwords don't match. Please try again", {
                autoClose: 1000,
            })
        } else if (Rpassword === null) {
            toast("Please Fill Confirm Password ", {
                autoClose: 1000,
            })
        } else if (email === null) {
            toast("Email is not found ", {
                autoClose: 1000,
            })
        } else {
            resetPassword(email?.email, password)
            toast("Password Updated successfully", {
                autoClose: 1500,
            })
            navigate('/login')
        }
    };

    return (
        <>
            <div className="login-container row">
                <div className="left-side col-5">
                    <div className="top-left d-flex align-items-center">
                        <i onClick={() => { navigate("/"); }} className="fa-sharp fa-solid fa-arrow-left"></i>
                        <p className="px-3 m-0">Login</p>
                    </div>
                    <img className="login-img" src={backimg} alt="" />
                </div>
                <div className="right-side col-7 d-flex align-items-center justify-content-center">
                    <form
                        action=""
                        className="form-container">
                        <div className=" logotext d-flex justify-content-center" style={{ alignItems: "center" }} >
                            <img src={logo} alt="" className="form-logo web1-logo" />
                            <span>Loadkro</span>
                        </div>

                        <div className='Details' >
                            <form>
                                <div className="form-group">
                                    <input type="password" value={values.password}
                                        className="form-control" id="password" name='password' aria-describedby="emailHelp" placeholder="New Password"
                                        onChange={(e) => { setValues((prev) => ({ ...prev, password: e.target.value })) }}
                                    />
                                </div>

                                <div class="form-group">
                                    <input type="password" value={values.Rpassword} name='Rpassword' className="form-control my-2 " id="lname" placeholder="Confirm Password"
                                        onChange={(e) => { setValues((prev) => ({ ...prev, Rpassword: e.target.value })) }}
                                    />
                                </div>

                                <div className="web1-buttons d-flex flex-column mt-3">
                                    <button type="submit" className="submit-btn btn btn-lg btn-block my-4" onClick={handleReset}>Save </button>
                                </div>
                            </form>
                        </div>

                        <div className="alternate-option text-center">
                            <div className="web1-buttons d-flex flex-column mt-3">
                                <Link to="/signup" state={{ talent: true }}>
                                    <button className="btn btn-talents">
                                        Sign up as Driver
                                    </button>
                                </Link>
                                <Link to="/signup" state={{ talent: false }}>
                                    <button className="btn btn-seekers">
                                        Sign up as User
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <ToastContainer />
        </>
    );
};

export default Login;
