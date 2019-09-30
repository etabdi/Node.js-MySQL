DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  
     Item_id INT NOT NULL AUTO_INCREMENT,
     
      PRIMARY KEY (item_id),

	  Product_name VARCHAR(50) NOT NULL,
	  
	  Department_name VARCHAR(30) NOT NULL,
	  
	  Price FLOAT(10,2) NOT NULL,
	  
	  Stock_quantity INT(10) NOT NULL
);

INSERT INTO products ( product_name, department_name,price, stock_quantity)
VALUES ("Lego City", "Toys & Games",10.99, 100),
       ("Echo Auto", "Electronics",44.99, 100),
       ("The water dancer", "Book",14.99, 50),
	   ("Belongsci Women's Dress", "Clothing",32.99, 25),
       ("Pirates of the Carribean", "Entertainment",7.95, 100),
       ("Play-Doh Party Pack", "Toys & Games",3.27,36),
       ("Clorox Disinfecting Wipes", "Health and Household",1.98, 44),
        ("Ego is the enemy", "Book",13.56, 12),
       ("Fire tv stick 4k", "Electronics",44.99, 100),
       ("Lego City", "Toys & Games",10.99, 100),
       ("Cottonelle Toilet paper", "Health and Household",6, 55)

;
