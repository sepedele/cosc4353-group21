import React from "react";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "./RegisterForm";
//import "../../Components/RegisterForm.css";

function Register() {
    let navigate = useNavigate();
    return (
        <div>
            <RegisterForm/>
        </div>
    );
}

export default Register;