import "./App.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { FuelHistory } from "./Pages/FuelQuoteHistory/FuelHistory";
import { NotFound } from "./Pages/NotFound";
import Login from "./Pages/LoginRegister/Login/Login";
import WithNav from "./NavigationBar/WithNav";
import WithoutNav from "./NavigationBar/WithoutNav";
import Register from "./Pages/LoginRegister/Register/Register";
import {Logout} from "./Pages/LoginRegister/Logout";
import ClientProfileForm from "./Pages/Profile/ProfileRegister";
import FuelQuoteForm from "./Pages/FuelQuote/FuelQuoteForm";
import ProfilePage from "./Pages/Profile/ProfilePage";

function App() {
  return (
    <Router> {/* this tells where in the app do you want router dom stuff*/}
      <Routes> {/* the possible Routes for the app*/}
        <Route element={<WithoutNav />}> {/* excludes navigation bar*/}
            <Route path="/" element={<Login />} />
        </Route>
        <Route element={<WithoutNav />}> {/* excludes navigation bar*/}
            <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<WithoutNav />}> {/* excludes navigation bar*/}
            <Route path="/logout" element={<Logout />} />
        </Route>
        <Route element={<WithoutNav />}> {/* excludes navigation bar*/}
            <Route path="/profile_register" element={<ClientProfileForm/>} />
        </Route>
        <Route element={<WithNav />}>
            <Route path="/profile" element={<ProfilePage/>} />
        </Route>
        <Route element={<WithNav />}>
            <Route path="/fuel_history" element={<FuelHistory />} />
        </Route>
        <Route element={<WithNav />}>
            <Route path="/quote_form" element={<FuelQuoteForm />} />
        </Route>
        <Route element={<WithoutNav />}>
            <Route path="*" element={<NotFound/>} />
        </Route>
      </Routes>
    </Router>
  ); 
}

export default App;
