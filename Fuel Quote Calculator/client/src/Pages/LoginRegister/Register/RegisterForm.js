import { useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate} from "react-router-dom";
import "./RegisterForm.css";

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
        console.log(data);
        //send data to backend to validate and in the mySQL to check that username is unique; learn to send sql error message to frontend! Then navigate!
        navigate("/profile_view");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className = "registerInputs" >
                <input type = "text" placeholder = "username . . ." {...register("Username")}/>
                <p> {errors.Username?.message} </p>
                <input type = "password" placeholder = "password . . ." {...register("Password")}/>
                <p> {errors.Password?.message} </p>
                <input type = "password" placeholder = "confirm password . . ." {...register("ConfirmedPassword")}/>
                <p> {errors.ConfirmedPassword?.message} </p>
                <input type = "submit" value= "Sign Up" />
            </div>
        </form>
    );
};