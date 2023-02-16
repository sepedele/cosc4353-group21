import React from "react";
import { useNavigate} from "react-router-dom";

function ProfileView() {
    let navigate = useNavigate();
    //let {username} = useParams();
    return (
        <div> 
            <h1> THIS IS PROFILE </h1>
            <button 
                onClick={() => {
                    navigate("/profile_edit");
                }}
            > 
            Change to profile_edit
            </button>
        </div>
    );
}

export default ProfileView;