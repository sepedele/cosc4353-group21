import { useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

export const LoginForm = () => {
    let navigate = useNavigate();
    const schema = yup.object().shape ({
        Username: yup.string().required("A username is required"),
        Password: yup.string().min(4).max(20).required(),
    });

    const {register, handleSubmit, formState: {errors}} = useForm ({
        resolver: yupResolver(schema), // handles frontend validation
    });
    
    const onSubmit = (data) => {
        console.log(data.Username);
        // Axios stuff to send here
        //send data to backend to validate and in the mySQL to check that username/password is valid; learn to send sql error message to frontend! Then navigate!
        navigate("/profile_view"); // this will occur if validation in backend and mySQL succeeds!
    };

    return (
        <div className = "loginContainer">
            <form onSubmit = {handleSubmit(onSubmit)}> {/* Submission occurs if fields are valid*/}
                <div className = "loginInputs" >
                    <input type = "text" placeholder = "username" {...register("Username")}/>
                    <p> {errors.Username?.message} </p>
                    <input type = "password" placeholder = "password" {...register("Password")}/>
                    <p> {errors.Password?.message} </p>

                    <div className = "loginButton" > 
                        <input type = "submit" value = "Login" />
                    </div>
                </div>
            </form> 
        </div>
    );
};