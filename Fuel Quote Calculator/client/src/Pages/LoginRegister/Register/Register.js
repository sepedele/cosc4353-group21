import React from "react";
//import { useNavigate } from "react-router-dom";
import { RegisterForm } from "./RegisterForm";
//import "../../Components/RegisterForm.css";

function Register() {
    //let navigate = useNavigate();
    return (
        <>
        <div className="banner">
            myApp
        </div>
        <div>
            <RegisterForm/>
        </div>
        </>
    );
}

export default Register;