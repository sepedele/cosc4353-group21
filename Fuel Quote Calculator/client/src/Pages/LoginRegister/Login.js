import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    let navigate = useNavigate();
    return (
        <>
        <input type = "text" placeholder = "username . . ."/>
        <input type = "text" placeholder = "password . . ." />

        <button> Login </button>

        <div>
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