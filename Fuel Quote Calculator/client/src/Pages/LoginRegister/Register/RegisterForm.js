import { useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate} from "react-router-dom";
import "./RegisterForm.css";
import Axios from 'axios';

export const RegisterForm = () => {
    let navigate = useNavigate();
    
    const schema = yup.object().shape ({
        Username: yup.string().required("A username is required"),
        Password: yup.string().min(4).max(20).required(),
        ConfirmedPassword: yup.string().oneOf([yup.ref("Password"), null], "Passwords must match").required("This is required"),
    });

    const {register, handleSubmit, formState: {errors}} = useForm ({
        resolver: yupResolver(schema),
    });
    
    const onSubmit = (data) => {
        //send data to backend to validate and in the mySQL to check that username is unique; learn to send sql error message to frontend! Then navigate!
        Axios.post("http://localhost:3001/user_register", { // sending register info to backend
            username: data.Username,
            password: data.Password,
            confirmedPassword: data.ConfirmedPassword,
            }).then((response) => {
                if(!(response.data.isError))
                {                    
                    //console.log(response.data);
                    if(response.data.loginRedirect)
                        navigate('/');
                    else
                        console.log('reload');
                }
                else
                console.log(response.data.responseError.errors[0]);
            });
    };

    return (
        <div className="registerContainer">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className = "registerInputs" >
                    <input type = "text" placeholder = "username" {...register("Username")}/>
                    <p> {errors.Username?.message} </p>
                    <input type = "password" placeholder = "password" {...register("Password")}/>
                    <p> {errors.Password?.message} </p>
                    <input type = "password" placeholder = "confirm password" {...register("ConfirmedPassword")}/>
                    <p> {errors.ConfirmedPassword?.message} </p>
                    <div className="signButton"> 
                        <input type = "submit" value= "Sign me up!" />
                    </div>
                </div>
            </form>
        </div>    
    );
};