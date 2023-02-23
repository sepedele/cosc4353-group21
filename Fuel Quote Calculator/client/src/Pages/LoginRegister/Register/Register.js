import React from "react";
//import { useNavigate } from "react-router-dom";
import { RegisterForm } from "./RegisterForm";
//import "../../Components/RegisterForm.css";

function Register() {
    //let navigate = useNavigate();
    return (
        <>
        <div className="banner">
            Register!
        </div>
        <div>
            <RegisterForm/>
        </div>
        </>
    );
}

export default Register;