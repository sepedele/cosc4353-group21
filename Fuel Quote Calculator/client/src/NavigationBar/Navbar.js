import {Link} from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
    return (
        <div className = "navigation_bar">
            <div className = "links" >
                <Link to = "/profile"> ProfilePage </Link>
                <Link to = "/quote_form"> FuelQuoteForm</Link>
                <Link to = "/fuel_history"> FuelHistory </Link>
                <Link to = "/logout"> Logout </Link>
            </div>
        </div>
    );
};