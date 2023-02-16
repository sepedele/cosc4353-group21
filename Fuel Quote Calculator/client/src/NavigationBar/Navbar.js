import {Link} from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
    return (
        <div className = "navigation_bar">
            <div className = "links" >
                <Link to = "/profile_view"> ProfileView </Link>
                <Link to = "/quote_edit"> QuoteEdit</Link>
                <Link to = "/fuel_history"> FuelHistory </Link>
            </div>
        </div>
    );
};