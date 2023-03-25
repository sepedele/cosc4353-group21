const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.post("/create", (req, res) => {
    const gallons = req.body.gallons;
    const delivery_date = req.body.delivery_date;
    const total = req.body.total;

    console.log(gallons);
    console.log(delivery_date);
    console.log(total);
    res.send({responseMsg:"success"})
});

app.get('/getInfo', (req, res) => { 
    res.send({delivery_address: "5656 Delivery St.", suggested_price: 3});
})

module.exports=app