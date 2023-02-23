import React from "react";
import { useNavigate} from "react-router-dom";

function ProfileView() {
    let navigate = useNavigate();
    //let {username} = useParams();
    return (
        <div> 
            <p> THIS IS PROFILE </p>
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