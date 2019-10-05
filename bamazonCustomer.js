var mysql = require('mysql');
var chalk = require('chalk');
var inquirer = require('inquirer');
var Table = require('cli-table')

var con = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
  database: "bamazon"
});


    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM bamazon.products", function (err, result, cols) {
            if (err) throw err;
            console.log(chalk.green.bold.underline('-----------------------------------Existing Inventory------------------------------- '));
       
            
            var res = '';
                    for (var i = 0; i < result.length; i++) {

                        var table = new Table({

                            head:['Item Id','Product Name','Department','Price ($)','Quantity(pcs)11'],
                            colWidths: [20, 40,40,20,20]
                            

                        })

                        table.push(
                        
                      [result[i].item_id,result[i].Product_name,result[i].Department_name , result[i].Price.toFixed(2) , result[i].Stock_quantity]
                       
                            )
                        ;
                        console.log(table.toString());
                        
                    }
                    promptPurchase();
            
            });
   });
 
                console.log("-----------------------------------------------------------------------------------------------------------------------")

    function promptPurchase(){
                inquirer.prompt([
        {
            type: 'input',
            name: 'Item_id',
             message: 'Please enter the Item ID you would like to buy.',
            filter: Number
        },
                {
                type: 'input',
                name: 'qty',
                 message: 'How many units you would like to buy',
                type: Number

            }

            ]).then(function (input) {

                var item = input.Item_id;
                var qty = input.qty;
                var queryStr = 'SELECT * FROM products WHERE ?';
                
            con.query(queryStr, {item_id: item}, function(err, data) {

                if (data.length === 0) 
                {
                console.log(chalk.red('ERROR: Invalid Item ID. Please select a valid Item ID.'));
                    

                } else {
                    var res_Data = data[0];
                                 
                   // console.log(qty)
                        if (qty <= data[0].Stock_quantity) {
                                    // console.log(data)

                           var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (res_Data.Stock_quantity - qty) + ' WHERE item_id = ' + item ;
                            
        
                            con.query(updateQueryStr, function(err, data) {
                                if (err) throw err;
                                 var table2 = new Table({
                                        head : [ 'Thank you for shoping  us!']
                                 });
                                        
                                         table2.push(
                                            
                                            {'Description': res_Data.Product_name},
                                            {'Unit Price ($)':res_Data.Price},
                                    
                                            {'Total Quantity (Pcs)': qty},
                                            {'Total amount ($)':res_Data.Price*qty}

                                          

                                 )

                                 console.log(table2.toString());
                                 promptPurchase();
                            })
                        } else {
                            console.log(chalk.red('--------------------------Sorry, Insufficient quantity!'+'\n'
                           
                                              +'                            Please modify your order.'+'-----------------------------------'+'\n'));
                            
                                              promptPurchase();
                           // displayInventory();
                        }

                        
                        var updateQueryStr = 'UPDATE products SET product_sales = ' + (res_Data.product_sales+(res_Data.Price*qty)) + ' WHERE item_id = ' + item;
  
                      con.query(updateQueryStr, function(err, data) {
                          if (err) throw err;})

               }
          
            });

            
            
         });

    }