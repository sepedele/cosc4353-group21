/*import { useNavigate } from "react-router-dom";*/
import { useState, useEffect } from "react";
import { useLocation, generatePath, useNavigate } from "react-router-dom";
import Axios from "axios";
import "../../nav.css";
import "./FuelHistory.css";

// creating a new instance of axios with the desired base URL
const api = Axios.create({
  baseURL: "http://localhost:3001",
});

function FuelHistory() {
  let navigate = useNavigate();
  const { state } = useLocation();
  const user_id = state.id;

  const [quoteHistory, setQuoteHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/quote_history");
        setQuoteHistory(response.data);
      } catch (error) {
        console.error(error);
        setErrorMessage("An error occurred while fetching quote history.");
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="navigation_bar">
        <div className="links">
          <button
            onClick={() => {
              const path = generatePath("/profile/:id", { id: user_id });
              navigate(path, { state: { id: user_id } });
            }}
          >
            Profile
          </button>

          <button
            onClick={() => {
              const path = generatePath("/fuel_quote/:id", { id: user_id });
              navigate(path, { state: { id: user_id } });
            }}
          >
            Fuel Quote
          </button>

          <button
            onClick={() => {
              const path = generatePath("/fuel_history/:id", { id: user_id });
              navigate(path, { state: { id: user_id } });
            }}
          >
            Fuel History
          </button>

          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="historyContainer">
        <h1>Quote History</h1>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Gallons Requested</th>
                <th>Delivery Address</th>
                <th>Delivery Date</th>
                <th>Suggested Price / Gallon</th>
                <th>Total Amount Due</th>
              </tr>
            </thead>
            <tbody>
              {quoteHistory.map((quote) => (
                <tr /*add key*/>
                  <td>{quote.gallons_requested}</td>
                  <td>{quote.delivery_address}</td>
                  <td>{quote.delivery_date}</td>
                  <td>{quote.suggested_price_per_gallon}</td>
                  <td>{quote.total_amount_due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
    </>
  );
}

export default FuelHistory;
