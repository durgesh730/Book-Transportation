import React, { useContext, useState } from "react";
import PhoneInput from "react-phone-number-input";
import { Link, useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import backimg from "../images/Logo.png";
import logo from "../images/Logo.png";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import driverContext from "./useContext/driverContext";
import TextField from '@material-ui/core/TextField';
import { serverhost } from "../host";


const Login = () => {
    const navigate = useNavigate();
    const context = useContext(driverContext);
    const { generateOTPAtSignup, UpcomingOtp } = context;
    const [Otp, setotp] = useState({ otp: "" });
    const [check, setcheck] = useState(false);
    const [phone, setPhone] = useState("+911234567890");
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        Rpassword: "",
        type: "Driver"
    });
    localStorage.setItem("code", UpcomingOtp?.code)

    const handleSignup = async (e) => {
        e.preventDefault();
        const { username, email, password, Rpassword } = values
        if (username === "") {
            toast("Please Enter your Name", {
                autoClose: 1000,
            })
        } else if (email === "") {
            toast("Please Enter your Email", {
                autoClose: 1000,
            })
        } else if (password === "") {
            toast("Please Enter the Password", {
                autoClose: 1000,
            })
        } else if (password.length < 4) {
            toast("Password must be atleast 6 characters", {
                autoClose: 1000,
            })
        } else if (Rpassword === '') {
            toast("Password must be atleast 6 characters", {
                autoClose: 1000,
            })
        } else if (password !== Rpassword) {
            toast("The Passwords entered don't match. Please try again", {
                autoClose: 1000,
            })
        } else if (phone.length <= 12) {
            toast("Please Enter correct Phone Number ", {
                autoClose: 1000,
            })
        } else {
            setcheck(true)
            generateOTPAtSignup(email);
            toast("OTP Send Successfully ", {
                autoClose: 1000,
            })
        }
    };

    const handleSaveData = async (e) => {
        e.preventDefault();
        const { username, email, password, type } = values
        const { otp } = Otp;
        const code = localStorage.getItem('code');
        if (code === otp) {
            const data = await fetch(`${serverhost}/user/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                    phone: phone,
                    type: type,
                })
            });
            const res = await data.json();
            if (res.status === 201) {
                localStorage.setItem("token", res.token);
                localStorage.setItem("user", JSON.stringify(res.user));
                localStorage.setItem("type", res.user.type);
            }
            if (localStorage.getItem("token")) {
                if (localStorage.getItem("type") === "user") {
                    navigate("/user");
                    toast("Signup Sucessfully", {
                        autoClose: 1500,
                    })
                }
                else if (localStorage.getItem("type") === "Driver") {
                    navigate("/driver");
                    toast("Signup Sucessfully", {
                        autoClose: 1500,
                    })
                } else if (localStorage.getItem("type") === "admin") {
                    navigate("/admin");
                    toast("Signup Sucessfully", {
                        autoClose: 1500,
                    })
                }
            }
            else { navigate("/"); }
        }
    }

    return (
        <>
            <div className="login-container row">
                <div className="left-side col-5">
                    <div className="top-left d-flex align-items-center">
                        <i onClick={() => { navigate("/"); }} className="fa-sharp fa-solid fa-arrow-left"></i>
                        <p className="px-3 m-0">Signup</p>
                    </div>
                    <img className="login-img w-100 " src={backimg} alt="" />
                </div>
                <div className="right-side col-7 d-flex align-items-center justify-content-center">
                    {/* Signup Form */}
                    <form className="form-container" id="signup-form">
                        <div className=" logotext d-flex justify-content-center" style={{ alignItems: "center" }} >
                            <img src={logo} alt="" className="form-logo web1-logo" />
                            <span>Loadkro</span>
                        </div>

                        {
                            (!check) ? (
                                <>
                                    <input
                                        type="text"
                                        placeholder="Enter Full Name"
                                        className="form-control my-2"
                                        label="Name"
                                        onChange={(event) => {
                                            setValues((prev) => ({ ...prev, username: event.target.value }));
                                        }}
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="form-control my-2"
                                        label="Email"
                                        onChange={(event) => {
                                            setValues((prev) => ({ ...prev, email: event.target.value }));
                                        }}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="form-control my-2"
                                        label="Password"
                                        onChange={(event) => {
                                            setValues((prev) => ({ ...prev, password: event.target.value }));
                                        }}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Re-enter Password"
                                        className="form-control my-2"
                                        onChange={(event) => {
                                            setValues((prev) => ({ ...prev, Rpassword: event.target.value }));
                                        }}
                                    />
                                    <PhoneInput
                                        className="form-control"
                                        placeholder="Enter phone number"
                                        value={phone}
                                        onChange={setPhone}
                                        defaultCountry=""
                                    />
                                    <div style={{ position: "relative", display: "flex" }}>
                                        <select className="form-control my-2"
                                            onChange={(event) => {
                                                setValues((prev) => ({ ...prev, type: event.target.value }));
                                            }}
                                        >
                                            <option value="Driver" >Driver</option>
                                            <option value="user">User</option>
                                        </select>
                                        <div
                                            style={{
                                                position: "absolute",
                                                right: "15px",
                                                top: "0",
                                                bottom: "0",
                                                display: "flex",
                                                alignItems: "center",
                                                color: "lightgrey",
                                            }}
                                        >
                                            <i className="fa-solid fa-chevron-down"></i>
                                        </div>
                                    </div>
                                    <input type="submit" onClick={handleSignup} className="submit-btn btn btn-lg btn-block my-2" value="Signup" />
                                </>

                            ) : (
                                <>
                                    <TextField
                                        id="standard-password-input"
                                        label="OTP"
                                        type="password"
                                        autoComplete="current-password"
                                        variant="standard"
                                        value={Otp.otp}
                                        name="otp"
                                        onChange={(e) => { setotp((prev) => ({ ...prev, otp: e.target.value })) }}
                                    />
                                    <input type="submit" onClick={handleSaveData} className="submit-btn btn btn-lg btn-block my-2" value="Verify Email" />
                                </>
                            )
                        }
                        <div className="alternate-option my-3 text-center">
                            Already have an account{" "}
                            <Link to={"/login"}> <b><u>Login</u></b>
                            </Link>
                        </div>
                    </form>
                    <div id="recaptcha-container"></div>
                </div>
            </div>
            
            <ToastContainer />
        </>
    );
};

export default Login;
