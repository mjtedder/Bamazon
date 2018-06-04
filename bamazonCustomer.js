require("dotenv").config()
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.password,
    database: "bamazon"
});

connection.connect(function (err) {
            if (err) throw err;
            //TESTING CONNECTION TO SQL
            console.log("Connected as ID " + connection.threadId)
            connection.query("SELECT * FROM products", function (err, res) {
                console.log(res);
            })
        });
    