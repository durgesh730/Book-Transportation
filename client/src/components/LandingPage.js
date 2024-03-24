import React from "react";
import { Link,  } from "react-router-dom";

import "../style/landingPage.css";
import logo from "../images/Logo.png";
import a1 from "../images/A1.jpg";
import a2 from "../images/A2.jpg";
import a3 from "../images/A3.jpg";
import a4 from "../images/A4.jpg";
import a5 from "../images/A5.jpg";
import a6 from "../images/A6.jpg";
import a7 from "../images/A7.jpg";
import a8 from "../images/A8.jpg";
import a9 from "../images/A9.jpg";
import a10 from "../images/A10.jpg";
import a11 from "../images/A11.jpg";
import a12 from "../images/A12.jpg";
import a13 from "../images/A13.jpg";
import a14 from "../images/A14.jpg";


const Login = () => {
    return (
        <>
            <div className="web1">
                <div className="row">
                    <div className="col-4 col">
                        <div className="web1-signin">
                            <div className="menu">
                                <div className="Rectangle-1"></div>
                                <div className="Rectangle-2"></div>
                                <div className="Rectangle-3"></div>
                            </div>
                            <div className=" logotext">
                                <img
                                    src={logo}
                                    alt="" className="web1-logo" />
                                <span>Loadkro</span>
                            </div>
                            <div className="web1-tagline my-4">Providing easy and efficient access to transportation services</div>
                            <div className="web1-buttons d-flex flex-column my-4 ">
                                <Link to="/signup"  >
                                    <button className="btn btn-talents">Sign up as Driver</button>
                                </Link>
                                <Link to="/signup">
                                    <button className="btn btn-seekers">Sign up as User</button>
                                </Link>
                            </div>
                            <div className="alternate-option mt-5 text-center">
                                Already have an account{" "}
                                <Link to="/login">
                                    <b style={{cursor:"pointer"}} >
                                        <u>Login</u>
                                    </b>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-8 col">
                        <div className="web1-images">
                            <div className="grid-container">
                                <div className="column">
                                    <div className="web1-image">
                                        <img src={a1} />
                                        <div className="image_overlay">
                                        </div>
                                    </div>
                                    <div className="web1-image">
                                        <img src={a2} />
                                        <div className="image_overlay">
                                        </div>
                                    </div>
                                    <div className="web1-image">
                                        <img src={a3} />
                                        <div className="image_overlay">
                                        </div>
                                    </div>
                                </div>

                                <div className="column">
                                    <div className="web1-image">
                                        <img src={a4} />
                                        <div className="image_overlay">
                                        </div>
                                    </div>
                                    <div className="web1-image">
                                        <img src={a5} />
                                        <div className="image_overlay">
                                        </div>
                                    </div>
                                    <div className="web1-image">
                                        <img src={a6} />
                                        <div className="image_overlay">
                                        </div>
                                    </div>
                                    <div className="web1-image">
                                        <img src={a7} />
                                        <div className="image_overlay">
                                        </div>
                                    </div>
                                </div>

                                <div className="column">
                                    <div className="web1-image">
                                        <img src={a8} />
                                        <div className="image_overlay">
                                        </div>
                                    </div>
                                    <div className="web1-image">
                                        <img src={a9} />
                                        <div className="image_overlay">
                                        </div>
                                    </div>
                                    <div className="web1-image">
                                        <img src={a10} />
                                        <div className="image_overlay">
                                        </div>
                                    </div>
                                </div>

                                <div className="column">
                                    <div className="web1-image">
                                        <img src={a11} />
                                        <div className="image_overlay">
                                        </div>
                                    </div>
                                    <div className="web1-image">
                                        <img src={a12} />
                                        <div className="image_overlay">
                                        </div>
                                    </div>
                                    <div className="web1-image">
                                        <img src={a13} />
                                        <div className="image_overlay">
                                        </div>
                                    </div>
                                    <div className="web1-image">
                                        <img src={a14} />
                                        <div className="image_overlay">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
