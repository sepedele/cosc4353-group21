import { useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate, generatePath } from "react-router-dom";
import Axios from 'axios';
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
        // Axios stuff to send here
        //send data to backend to validate and in the mySQL to check that username/password is valid; learn to send sql error message to frontend! Then navigate!
        Axios.post("http://localhost:3001/user_login", { // sending login info to backend
            username: data.Username,
            password: data.Password,
            }).then((response) => {
                if(!(response.data.isError))
                {
                    if(response.data.loginReload)
                        console.log('reload');
                    else
                        if(response.data.isFirst) {
                            const path = generatePath('/profile_register/:id', {id: response.data.user_id});
                            navigate(path, {state: {id: response.data.user_id}});
                        }
                        else {
                            const path = generatePath('/profile/:id', {id: response.data.user_id});
                            navigate(path, {state: {id: response.data.user_id}});
                        }
                }
                else
                    console.log(response.data.responseError.errors[0]);
            });
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