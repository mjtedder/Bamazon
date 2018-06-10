//required node packages
require("dotenv").config()
var mysql = require("mysql");
var inquirer = require("inquirer");
var console_table = require("console.table");

//create connection to DB
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
    //console.log("Connected as ID " + connection.threadId)
    //afterConnection();
});

//display list of available products from the DB
var display = function() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.table(results);
        console.log("==========================================================================================");

        //for (let i = 0; i < results.length; i++) {
            //console.log("ID: " + results[i].item_id + " | " + "Product: " + results[i].product_name + " | " + "Department: " + results[i].department_name + " | " + "Price: " + "$" + results[i].price + " | ");
            //console.log("======================================================================================");
        })
    };


//show the list to the customer and allow them to select a product
var run = function() {
    //query the database for all items being auctioned
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        //once you have the items, prompt user for which item they want to buy
        inquirer
            .prompt([{
                    name: "product",
                    type: "list",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].product_name);
                        }
                        return choiceArray;
                    },
                    message: "Which item would you like to purchase?"
                },
                //use inquirer to ask quantity
                {
                    name: "amount",
                    type: "input",
                    message: "How many would you like to purchase?"
                }
            ])
            //after product is selected, show details
            .then(function (answer) {
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.product) {
                        chosenItem = results[i];
                    }
                }

                //check requested quantity vs stock
                //if requested quantity is too high, reduce request and confirm
                if (chosenItem.stock_quantity > parseInt(answer.amount)) {
                    connnection.query("UPDATE products SET ? WHERE?", [{
                            stock_quantity: chosenItem.stock_quantity - parseInt(answer.amount)
                        },
                        {
                            id: chosenItem.id
                        }
                    ], function (error) {
                        if (error) throw err;
                        console.log("\n\n");
                        console.log("===========================================");
                        console.log("Product purchased successfully!");
                        console.log("===========================================");
                        console.log("Transaction Summary");
                        console.log("-------------------------------------------");
                        console.log("Item Name: " + chosenItem.product_name);
                        console.log("Item Count: " + parseInt(answer.amount));
                        console.log("-------------------------------------------");
                        console.log("Total: " + "$" + (chosenItem.price * parseInt(answer.amount)));
                        console.log("===========================================");
                        console.log("\n\n");
                        display();
                        run();
                    })
                } else {
                    console.log("===============================================");
                    console.log("Insufficient stock.");
                    console.log("===============================================");
                    display();
                    run();
                }
            });
    });
};

display();
run();

//close connection