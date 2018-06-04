//required node packages
require("dotenv").config()
var mysql = require("mysql");
var inquirer = require("inquirer");

//creat connection to DB
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.password,
    database: "bamazon"
});

//connecting to DB
connection.connect(function (err) {
    if (err) throw err;
    //TESTING CONNECTION TO SQL
    console.log("Connected as ID " + connection.threadId)
    afterConnection();
});

//display list of available products from the DB
function afterConnection() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        console.log("BAMAZON STORE");
        console.log("=====================================================================");

        for (let i = 0; i < results.length; i++) {
            console.log("ID: " + results[i].item_id + " | " + "Product: " + results[i].product_name + " | " + "Department: " + results[i].department_name + " | ");
            console.log("=====================================================================");
        }

    });
}

//show the list to the customer and allow them to select a product

//after product is selected, show details

//use inquirer to ask quantity

//check requested quantity vs stock
//if requested quantity is too high, reduce request and comfirm


//if customer agrees, complete transaction, else cancel transaction

//if quantity is acceptable, make the sale


// show the customer the total cost of the sale, and confirm

//if customer purchases, update stock on DB

//else, cancel transaction


//close connection