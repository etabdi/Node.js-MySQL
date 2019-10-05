var mysql = require('mysql');
var chalk = require('chalk');
var inquirer = require('inquirer');
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
      
 inquirer.prompt([
    {
        type: "list",         
        name: 'Mang_login',
        message: 'Menu options;',
        choices:['View Products for Sale','View Low Inventory','Add to Inventory','Add New Product']
    }

     ]).then(function (res) {

     if  (res.Mang_login === "View Products for Sale") {

      console.log(chalk.green.underline('Products for Sale'));
      var res = '';
      for (var i = 0; i < result.length; i++) {
          res = '';
          res +=(chalk.blue( 'Item ID: ') )+ result[i].Item_id + '  |  ';
          res +=(chalk.red( 'Product Name: ')) + result[i].Product_name + '  | ';
          res += (chalk.blue('Department: ' ))+ result[i].Department_name + '  |  ';
          res += (chalk.red.underline('Price:'))+'  $'+ result[i].Price + '  |  ' ;
          res += (chalk.blue.underline('Quantity: '))+ result[i].Stock_quantity+'pcs'+ '\n';
           
          console.log(res+'\n'+'------------------------------------------------------------------------------------------------------------------');
          
      }
      
      con.end();
    } else if (res.Mang_login === "View Low Inventory") {

        console.log('View Low Inventory')
        for (var i = 0; i < result.length; i++) {

          if (result[i].Stock_quantity < 5 ){

                console.log(result[i])
                
          }
          
            
        }
        con.end();

      }
     else if (res.Mang_login === "Add to Inventory") {

       inquirer.prompt([
            {
                 type:'input',
                 name:'Item_id',
                  message:"Enter product name:"
        },
        {
            type:'input',
            name:'qty',
             message:"Please Enter quantity you went add: "
            },
         {
            type:'confirm',
            name:'confirm',
             message:"Are you shore?"
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
                        var sum = [Number.parseInt(res_Data.Stock_quantity)+Number.parseInt(qty)];

                       var updateQueryStr = 'UPDATE products SET stock_quantity = ' + sum + ' WHERE item_id = ' + item;
    
                        con.query(updateQueryStr, function(err, data) {
                            if (err) throw err;
                            
                            console.log(chalk.green('--------------------------Successfully Added to Inventory-----------------------'));
                                                         
                                                                 con.end();
                        })
                    } else {
                        console.log(chalk.red('--------------------------Please Try again-----------------------------------'));
                        

                       displayInventory();
                    }
           }
        });

        
        
     });

} else if (res.Mang_login === "Add New Product") {

        inquirer.prompt([
            {
                type:'input',
                name:'prduct_name',
                 message:"Enter product name:"
            },
            {
                type:'input',
                name:'Department_name',
                 message:"Enter Department name:" 
            
            },

            {
                type:'input',
                name:'price',
                 message:"Enter each price:" 
            
            },
            {
                type:'input',
                name:'qty_add',
                 message:"Quantity?" 
            
           }
          ]).then(function (res) {
               // console.log(  res.prduct_name, res.Department_name, res.price,res.qty_add);
                updateDb(
                        res.prduct_name,
                        res.Department_name,
                        res.price,
                        res.qty_add
            );
            
            function updateDb(Product_name,Department_name,price,qty_add) {
                con.query(
                    "INSERT INTO products SET ?",
             {
                Product_name: Product_name,
                Department_name:Department_name,
                Price:price,
                Stock_quantity:qty_add
            },
                    
                 function(err, data) {
                 
            if (err,res) 
            {
            console.log(chalk.green.underline(Product_name+'--------------------------------- Successfully registered in to Bamazon Database  '));
                
            con.end();
        
        }   


        }
        
       
                     )}


                 });
             };
          
            }
        )}
    )}
)