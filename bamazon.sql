DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('Apple iPhone X', 'Electronics', 999.99, 300),
('Star War: The Last Jedi', 'Film', 24.99, 52),
('Super Mario Odyssey', 'Video Games', 59.95, 80),
('Nintendo Switch', 'Video Games', 299.99, 100),
('Espresso 4000', 'Appliances', 199.99, 30),
('Sony PlayStation 4', 'Video Games', 399.95, 204),
('Fight Club', 'Books', 19.95, 43),
('Dragon Quest XI', 'Video Games', 79.99, 29),
('Cup Noodles', 'Food', 0.99, 99);
