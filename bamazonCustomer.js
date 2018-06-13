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
    if (err) {
    //TESTING CONNECTION TO SQL
    console.error("error connecting: " + error.stack);
    }
    display();
    });

//display list of available products from the DB
var display = function() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        //Draw a table in terminal
        console.table(res);
        run(res);
    });
}


//show the list to the customer and allow them to select a product
var run = function(inventory) {
        //once you have the items, prompt user for which item they want to buy
        inquirer
        .prompt([
            {
              type: "input",
              name: "choice",
              message: "What is the ID of the item you would you like to purchase? [Cancel Purchase with C]",
              validate: function(val) {
                return !isNaN(val) || val.toLowerCase() === "c";
              }
            }
          ])
          .then(function(val) {
            // Check if the user wants to quit the program
            promptExit(val.choice);
            var choiceId = parseInt(val.choice);
            var product = checkInventory(choiceId, inventory);
                //check requested quantity vs stock
                //if requested quantity is too high, reduce request and confirm
                if (product) {
                    promptQuantity(product);
                }
                else {
                    console.log("\nSorry, we do not carry that item.");
                    display();
                }
            });
        }
        //Use inquirer to ask customer how much of a product they would like to buy
        function promptQuantity(product) {
            inquirer
            .prompt([
                {
                    type: "input",
                    name: "quantity",
                    message: "How many would you like to buy? [Cancel Purchase with C]",
                    validate: function(val) {
                        return val > 0 || val.toLowerCase() === "c";
                    }
                }
            ])
            .then(function(val) {
                //After purchase, see if user wishes to exit application
                promptExit(val.quantity);
                var quantity = parseInt(val.quantity);
                //Checks that supply meets demand
                if (quantity > product.stock_quantity) {
                    console.log("\nInsufficient quantity!");
                    console.log("\n=========================================================");
                    display();
                }
                else {
                    purchase(product, quantity);
                }
            });
        }
        // Evaluating supply/demand
        function purchase(product, quantity) {
            connection.query(
                "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
                [quantity, product.item_id],
                function(err, res) {
                    //Purchase notification, restart application
                    console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!");
                    console.log("\n=============================================================");
                    display();
                }
            );
        }
        
        // Verifying inventory can meet demand
        function checkInventory(choiceId, inventory) {
            for (var i = 0; i < inventory.length; i++) {
                if (inventory[i].item_id === choiceId) {
                    return inventory[i];
                }
            }
            return null;
        }

        //Check if user wants to exit bamazon
        function promptExit(choice) {
            if (choice.toLowerCase() === "c") {
                console.log("Goodbye!");
                process.exit(0);
            }
        }