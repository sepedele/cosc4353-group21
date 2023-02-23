import React from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import "./Login.css";

function Login() {
    let navigate = useNavigate();
    return (
        <>
        <div className="banner">
            myApp Login
        </div>
        <div>
            <LoginForm/>
        </div>
        <div className="signSection">

            <p> Not registed? </p>
            <button 
                onClick={() => {
                    navigate("/register");
                }}
            > 
            Sign up!
            </button>
        </div>
        </>
    );
}

export default Login;