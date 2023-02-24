import './App.css'

function TotalPrice() {
  const gallonVal = document.getElementById('gallons').value;
  const priceVal = document.getElementById('price').value;
  const totalVal = gallonVal*priceVal;
  document.getElementById('total').value = totalVal;
}


function App() {
  return (
    <div className="container">
      <div className = "fuel-paragraph">
      <h1>Fuel Quote Form</h1>
      <p>Fill out the form below.</p>
      </div>
      
      <form>
      <div className="form-group">
        <label className="form-label">Gallons Requested:</label>
          <input
           type="number" 
           className = "form-control"
           pattern="[0-9]*"
           name="gallons_requested"
           id="gallons"
           oninput="TotalPrice();"
           required
           />
          </div>
        
        <div className="form-group">
        <label className="form-label">Delivery Address:</label>
          <input 
          type="text" 
          className = "form-control"
          name="delivery_address" 
          id="Daddress"
          readOnly={true}
          />
        </div>
        <div className="form-group">
        <label className="form-label">Delivery Date:</label>
          <input 
          type="date" 
          className = "form-control"
          name="delivery_date"
          id="Ddate"
          />
        </div>
        <div className="form-group">
        <label className="form-label">Suggested Price:</label>
          <input 
          type="number" 
          className = "form-control"
          name="suggested_price" 
          id="price"
          oninput="TotalPrice();"
          readOnly={true}
          />
        </div>

        <div className="form-group">
        <label className="form-label">Total Amount Due:</label>       
          <input 
          type="number" 
          className = "form-control"
          name="amount_due" 
          id="total"
          readOnly={true}
          oninput="TotalPrice();"
          />
        </div>

        <div className="form-buttons">
        <button type="button" onClick={TotalPrice}>Calculate</button>
         <button type="submit">Submit</button>
      </div>
      </form>
    </div>
  );
};

export default App;
