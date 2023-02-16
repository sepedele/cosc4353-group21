import "./App.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { FuelHistory } from "./Pages/FuelQuoteHistory/FuelHistory";
import { ProfileEdit } from "./Pages/Profile/ProfileEdit";
import ProfileView from "./Pages/Profile/ProfileView";
import { NotFound } from "./Pages/NotFound";
import Login from "./Pages/LoginRegister/Login";
import WithNav from "./NavigationBar/WithNav";
import WithoutNav from "./NavigationBar/WithoutNav";
import {QuoteEdit} from "./Pages/FuelQuote/QuoteEdit";
import {QuoteView }from "./Pages/FuelQuote/QuoteView";
import Register from "./Pages/LoginRegister/Register/Register";

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
        <Route element={<WithNav />}>
            <Route path="/profile_edit" element={<ProfileEdit />} />
        </Route>
        <Route element={<WithNav />}>
            <Route path="/profile_view" element={<ProfileView />} />
        </Route>
        <Route element={<WithNav />}>
            <Route path="/fuel_history" element={<FuelHistory />} />
        </Route>
        <Route element={<WithNav />}>
            <Route path="/quote_edit" element={<QuoteEdit />} />
        </Route>
        <Route element={<WithNav />}>
            <Route path="/quote_view" element={<QuoteView />} />
        </Route>
        <Route element={<WithoutNav />}>
            <Route path="*" element={<NotFound/>} />
        </Route>
      </Routes>
    </Router>
  ); 
}

export default App;
