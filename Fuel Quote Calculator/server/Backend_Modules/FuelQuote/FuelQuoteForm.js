const express = require("express");
const fuelquoteform = express();
const cors = require("cors");
const mySqlConnection = require('../../database');

fuelquoteform.use(cors());
fuelquoteform.use(express.json());

function LocationFactor(user_id) { // helper function to determine Location Factor 
    return new Promise((resolve, reject) => {
        mySqlConnection.query("SELECT * FROM ClientInformation WHERE user_id = ?", [user_id],
        (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                if (result[0].state === 'TX') {
                    resolve(.02);
                } else {
                    resolve(.04);
                }
            }
        })
    });
}

function HistoryFactor(user_id) { // helper function to determine History Factor
    return new Promise((resolve, reject) => {
        mySqlConnection.query("SELECT count(*) FROM FuelQuote WHERE user_id = ?", [user_id],
        (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                if (result === 0) {
                    resolve(0);
                } else {
                    resolve(.01);
                }
            }
        })
    });
}

function GallonFactor(gallons) { // helper function to determine Gallons Requested Factor
    if(gallons >= 1000)
        return .02;
    else
        return .03 ;
}

fuelquoteform.post('/getAddress', async (req, res) => { //grab address info from database to display on frontend
    console.log(req.body.user_id);

    mySqlConnection.query("SELECT * FROM ClientInformation WHERE user_id = ?", [req.body.user_id],
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("first address grabbed from other table");
            const delivery_address = result[0].address1;
            res.send({delivery_address: delivery_address});
        }
    }) 
})

fuelquoteform.post('/getQuote', async (req, res) => { // Pricing Module, grabs info from helper functions and calculates prices
    const location = await LocationFactor(req.body.user_id);
    const ratefactor = await HistoryFactor(req.body.user_id);
    const gallonfactor = GallonFactor(req.body.gallons);

    const margin = 1.50 * (location - ratefactor + gallonfactor + .10);
    const suggested_price = 1.50 + margin;
    const total = (req.body.gallons) * suggested_price; 
    res.send({total: total, suggested_price: suggested_price});
})

fuelquoteform.post("/submitQuote", async (req, res) => { // save quote in database
    const gallons = req.body.gallons;
    const delivery_date = req.body.delivery_date;
    const total = req.body.total;
    const user_id = req.body.user_id;
    const suggested_price = req.body.suggested_price
    const delivery_address = req.body.delivery_address;

    console.log(gallons);
    console.log(delivery_date);
    console.log(delivery_address);
    console.log(total);
    console.log(user_id);

    //inserting data into fuelquote table
    mySqlConnection.query("INSERT INTO FuelQuote (gallonsRequested, address, date, suggestedPrice, total, user_id) VALUES (?,?,?,?,?,?)", 
    [gallons, delivery_address, delivery_date, suggested_price, total, user_id], 
    (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log("values inserted");
            res.send({responseMsg:"success"})
        }
    })  
  });

module.exports=fuelquoteform