import React, { useContext, useState } from "react";
import "../style/login.css";
import backimg from "../images/Logo.png";
import logo from "../images/Logo.png";
import { useNavigate, Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import driverContext from "./useContext/driverContext";
import { serverhost } from "../host";

const Login = () => {
    const context = useContext(driverContext)
    const { generateOTP, UpcomingOtp } = context;
    const navigate = useNavigate();
    const [check, setCheck] = useState(false)
    const [enterOTP, setEnterOTP] = useState(false)
    const [Otp, setotp] = useState({ otp: "" });
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    localStorage.setItem("code", UpcomingOtp?.code)
    localStorage.setItem("_id", UpcomingOtp?.user?._id)

    const handleState = () => {
        setCheck(true)
    }

    const handlelogin = async (e) => {
        e.preventDefault();
        const { email, password } = values;
        if (email === "") {
            toast("Please Enter your Email", {
                autoClose: 1000,
            })
        } else if (password === "") {
            toast("Please Enter your Password", {
                autoClose: 1000,
            })
        } else {
            const data = await fetch(`${serverhost}/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                })
            });
            const res = await data.json();
            toast(res.error, {
                autoClose: 1500,
            })
            if (res.status === 201) {
                localStorage.setItem("token", res.token);
                localStorage.setItem("user", JSON.stringify(res.user));
                localStorage.setItem("type", res.user.type);
                toast("Logged in Sucessfully", {
                    autoClose: 1500,
                })
            }
            if (localStorage.getItem("token")) {
                if (localStorage.getItem("type") === "user") {
                    navigate("/user");
                }
                else if (localStorage.getItem("type") === "Driver") {
                    navigate("/driver");
                } else if (localStorage.getItem("type") === "admin") {
                    navigate("/admin");
                }
            }
        }
    };


    const SendOtp = (e) => {
        e.preventDefault();
        const { email } = values;
        if (email === '') {
            toast("Enter Email", {
                autoClose: 1000,
            })
        } else {
            generateOTP(email);
            setEnterOTP(true);
        }
    }

    const checkOtp = (e) => {
        e.preventDefault();
        const { otp } = Otp;
        const code = localStorage.getItem('code');
        if (code === otp) {
            navigate('/resetPassword')
            localStorage.setItem("user", JSON.stringify(UpcomingOtp.user));
            localStorage.setItem("type", UpcomingOtp.user.type);
        } else {
            toast("OTP is Invalid", {
                autoClose: 1500,
            })
        }
    }

    return (
        <>
            <div className="login-container row">
                <div className="left-side">
                    <div className="top-left d-flex align-items-center">
                        <i onClick={() => { navigate("/"); }} className="fa-sharp fa-solid fa-arrow-left"></i>
                        <p className="px-3 m-0">Login</p>
                    </div>
                    <img className="login-img" src={backimg} alt="" />
                </div>
                <div className="right-side col-12 ">
                    <form
                        action=""
                        className="form-container">
                        <div className=" logotext d-flex justify-content-center align-items-center ">
                            <img src={logo} alt="" className="form-logo web1-logo" />
                            <span>Loadkro</span>
                        </div>
                        {
                            (!enterOTP) ? (
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="form-control my-2"
                                    required
                                    onChange={(event) => {
                                        setValues((prev) => ({ ...prev, email: event.target.value }));
                                    }}
                                />) : (
                                <input
                                    type="number"
                                    placeholder="Enter Your OTP"
                                    className="form-control my-2"
                                    required
                                    onChange={(event) => {
                                        setotp((prev) => ({ ...prev, otp: event.target.value }));
                                    }}
                                />
                            )
                        }


                        {(!check) ?
                            <>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="form-control my-2"
                                    required
                                    onChange={(event) => {
                                        setValues((prev) => ({ ...prev, password: event.target.value }));
                                    }}
                                />

                                <button
                                    type="submit"
                                    onClick={handlelogin}
                                    className="submit-btn btn btn-lg btn-block my-4"
                                >
                                    Login
                                </button>
                            </> : (

                                (!enterOTP) ?
                                    <button
                                        type="submit"
                                        className="submit-btn btn btn-lg btn-block my-4"
                                        onClick={SendOtp}
                                    >
                                        Send OTP
                                    </button> : (
                                        <button
                                            type="submit"
                                            className="submit-btn btn btn-lg btn-block my-4"
                                            onClick={checkOtp}
                                        >
                                            Submit OTP
                                        </button>
                                    )
                            )
                        }



                        <div className="alternate-option text-center">
                            {(!check) ? (
                                <div className="text-center" >
                                    <Link onClick={handleState} > Reset Your Password </Link>
                                </div>
                            ) : ""
                            }
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
