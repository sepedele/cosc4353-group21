import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./FuelHistory.css";
import data from "./mock-data.json";

export const FuelHistory = () => {
  const [quoteHistory, setQuoteHistory] = useState(data);

  return (
    <div className="container">
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
              <tr>
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
    </div>
  );
};
