DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price INT(11),
    stock_quantity INT(11),
    PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('Apple iPhone 14', 'Electronics', 40000, 3);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('Tesla 3', 'Electronics', 80000, 7);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('The White House', 'Real Estate', 3, 1);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('Banana Creme Pie', 'Foods', 5, 100);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('Espresso 4000', 'Appliances', 100, 30);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('Sony PlayStation 9', 'Entertainment', 900, 9);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('')

SELECT * FROM products;