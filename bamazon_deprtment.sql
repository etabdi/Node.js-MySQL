DROP TABLE IF EXISTS departments; 
CREATE TABLE departments (
	department_id INT AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(100) NULL,
  over_head_costs DECIMAL(10,2) NULL,
  PRIMARY KEY (department_id)
);

-- default table vals --
INSERT INTO departments (department_name, over_head_costs)
VALUES ("Book", 500), ("Toys & Games", 500), ("Entertainment", 600), ("Health and Household", 1200), ("Electronics", 900);

-- view tables --
SELECT * FROM products;
SELECT * FROM departments;

-- inner join for profit query --
SELECT department_id, departments.department_name, over_head_costs, SUM(product_sales) AS product_sales, SUM(product_sales) - over_head_costs AS total_profit
FROM departments
INNER JOIN products
ON departments.department_name = products.department_name
GROUP BY department_id;