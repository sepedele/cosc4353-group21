const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require('mysql');

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection(
    {
        user: 'root',
        host: 'localhost',
        password: 'WBpass21sure',
        database: 'fuelquotesystem'
    }
  );

connection.connect(function(err) {  //test connection
    if (err) {
        console.log(err);
    } else {
        console.log("successfully connected");
    }
});

app.get('/getInfo', (req, res) => {     //grab info from database to display on frontend
    const suggested_price = 4;  //<-- this will come from pricing module later

    connection.query("SELECT address1 FROM clientinformation WHERE user_id = '1'", 
    async (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("first address grabbed from other table");
            const delivery_address = result[0].address1;
            res.send({delivery_address: delivery_address, suggested_price: suggested_price});
        }
    }) 
})

app.post("/create", (req, res) => {
    const gallons = req.body.gallons;
    const delivery_date = req.body.delivery_date;
    const total = req.body.total;
    const user_id = req.body.user_id;
    const suggested_price = 4;      //will have to get this from pricing module later

    console.log(gallons);
    console.log(delivery_date);
    console.log(total);
    console.log(user_id);
    res.send({responseMsg:"success"})

    //get delivery address from clientinformation table and insert that value into a variable  
    connection.query("SELECT * FROM clientinformation WHERE user_id = ?",
    [user_id],
    async (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("address grabbed from other table");
            console.log(result);
            const delivery_address = result[0].address1;

            //inserting data into fuelquote table
            connection.query("INSERT INTO fuelquote (gallonsRequested, address, date, suggestedPrice, total, user_id) VALUES (?,?,?,?,?,?)", 
            [gallons, delivery_address, delivery_date, suggested_price, total, user_id], 
            (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("values inserted");
                }
            })            
        }
    })  

  });

module.exports=app