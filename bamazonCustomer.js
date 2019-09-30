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


    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM bamazon.products", function (err, result, cols) {
            if (err) throw err;
            console.log(chalk.green.bold.underline('-----------------------------------Existing Inventory------------------------------- '));
       
            
            var res = '';
                    for (var i = 0; i < result.length; i++) {
                        res = '';
                        res +=(chalk.blue( 'Item ID: ') )+ result[i].Item_id + '  |  ';
                        res +=(chalk.red( 'Product Name: ')) + result[i].Product_name + '  | ';
                        res += (chalk.blue('Department: ' ))+ result[i].Department_name + '  |  ';
                        res += (chalk.red.underline('Price:'))+'  $'+ result[i].Price + '  |  ' ;
                        res += (chalk.blue.underline('Quantity: '))+ result[i].Stock_quantity+'pcs'+ '\n';

                        console.log(res);
                        
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
                                  //  console.log(data)

                           var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (res_Data.Stock_quantity - qty) + ' WHERE item_id = ' + item ;
                            
        
                            con.query(updateQueryStr, function(err, data) {
                                if (err) throw err;
                                
                                console.log(chalk.green(
                                                    '---------------------------------------- Thank you! We have received your order!------------------------------------'+'\n'
                                                     +'Below is your order informarion'+'\n')+(chalk.yellow('Description: '+ res_Data.Product_name+'\n'+'Unit Price: '+res_Data.Price+' $'+'\n'
                                                     +'Order Qnty: ' + qty+'pcs'+'\n'
                                                     +'Total price: '+ (res_Data.Price*qty)+' $')));
                                                             
                                                                     con.end();
                            })
                        } else {
                            console.log(chalk.red('--------------------------Sorry, Insufficient quantity!'+'\n'
                           
                                              +'                            Please modify your order.'+'-----------------------------------'+'\n'));
                            

                           // displayInventory();
                        }

                        
                        var updateQueryStr = 'UPDATE products SET product_sales = ' + (res_Data.product_sales+(res_Data.Price*qty)) + ' WHERE item_id = ' + item;
  
                      con.query(updateQueryStr, function(err, data) {
                          if (err) throw err;})
               }
            });

            
            
         });

    }