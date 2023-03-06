import "./App.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import FuelHistory from "./Pages/FuelQuoteHistory/FuelHistory";
import { NotFound } from "./Pages/NotFound";
import Login from "./Pages/LoginRegister/Login/Login";
import Register from "./Pages/LoginRegister/Register/Register";
import {Logout} from "./Pages/LoginRegister/Logout";
import ClientProfileForm from "./Pages/Profile/ProfileRegister";
import FuelQuoteForm from "./Pages/FuelQuote/FuelQuoteForm";
import ProfilePage from "./Pages/Profile/ProfilePage";

function App() {
  return (
    <Router> {/* this tells where in the app do you want router dom stuff*/}
      <Routes> {/* the possible Routes for the app*/}

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/logout" element={<Logout />} />

        <Route path="/profile_register/:id" element={<ClientProfileForm/>} />
    
        <Route path="/profile/:id" element={<ProfilePage/>} />
    
        <Route path="/fuel_history/:id" element={<FuelHistory />} />

        <Route path="/fuel_quote/:id" element={<FuelQuoteForm />} />
    
        <Route path="*" element={<NotFound/>} />
        
      </Routes>
    </Router>
  ); 
}

export default App;
