var mysql = require('mysql');
var chalk = require('chalk')
var inquirer = require('inquirer')

var con = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
  database: "bamazon"
});


con.connect(function(error){
	if (error) throw error;
	
	inquirer.prompt([
		{
			name: "action",
			type: "list",
			choices: ["View Product Sales By Department", "Create New Department", "Exit"],
			message: "Please select what you would like to do."
		},
	]).then(function(response) {
		if (response.action === "View Product Sales By Department") {
        
                
             var joinQuery = "SELECT department_id, departments.department_name, over_head_costs,"
                                + " SUM(product_sales) AS product_sales," 
                                + " SUM(product_sales) - over_head_costs AS total_profit ";
                            joinQuery += "FROM departments INNER JOIN products ";
                            joinQuery += "ON departments.department_name = products.department_name ";
                            joinQuery += "GROUP BY department_id ";
                        
                                con.query(joinQuery, function(error, results) {
                                if (error) throw error;
                                consoleTableProfit("\nDepartmental Profit", results);
                                
                            });
                        
		} else if (response.action === "Create New Department") {
            createDepartment();
            
            
		} else if (response.action === "Exit") {
			exit();
		}
	});

});




function createDepartment() {
		con.query("SELECT * FROM departments", function (error, results) {
		if (error) throw error;
		
		consoleTableDept("\nCurrent Department Data", results);
		
		inquirer.prompt([
			{
				name: "name",
				message: "Please input new department name.",
				
				validate: function(value) {
				
					var deptArray = [];
				
					for (var i = 0; i < results.length; i++) {
						deptArray.push(results[i].department_name.toLowerCase());
					}
				
					if (deptArray.indexOf(value.toLowerCase()) === -1) {
						return true;
					}
					return false;
				}
			},
			{
				name: "overhead",
				message: "Input new department overhead costs.",
			
				validate: function(value) {
					if (isNaN(value) === false && value > 0) {
						return true;
					}
					return false;
				}
			}
		]).then(function(newDept) {
		
			con.query(
				"INSERT INTO departments SET ?",
				{
					department_name: newDept.name,
					over_head_costs: parseFloat(newDept.overhead).toFixed(2)
				}, 
				function(error, results) {
				
					if (error) throw error;
					console.log("-------------------------------------------------------------------------------------------------------")
					console.log(chalk.green("\n----------------------------New department added successfully.----------------------------\n"));
					
			});
		});
	});
}


function consoleTableProfit(title, results) {
	
	var values = [];

	for (var i = 0; i < results.length; i++) {
	
		var resultObject = {
			ID: results[i].department_id,
			Department: results[i].department_name,
			Overhead: "$" + results[i].over_head_costs.toFixed(2),
			Product_Sales: "$" + results[i].product_sales.toFixed(2),
			Total_Profit: "$" + results[i].total_profit.toFixed(2)
		};

		values.push(resultObject);
	}

	console.log(title, values);
	
}


function consoleTableDept(title, results) {

	var values = [];

	for (var i = 0; i < results.length; i++) {
	
		var resultObject = {
			ID: results[i].Department_id,
			Department: results[i].department_name,
			Overhead: "$" + results[i].over_head_costs.toFixed(2),
		};
		
		values.push(resultObject);
	}

	console.log(title, values);


}

