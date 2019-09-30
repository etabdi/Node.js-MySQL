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
      
 inquirer.prompt([
    {
        type: "list",         
        name: 'choise',
        message: 'Menu options;',
        choices:['View Products for Sale','View Low Inventory','Add to Inventory','Add New Product']
    }

     ]).then(function (res) {

     if  (res.choise === "View Products for Sale") {

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
    } else if (res.choise === "View Low Inventory") {

        console.log('View Low Inventory')
        for (var i = 0; i < result.length; i++) {

          if (result[i].Stock_quantity < 5 ){

                console.log(result[i])
                
          }
          
            
        }
        con.end();

      }
     else if (res.choise === "Add to Inventory") {

       inquirer.prompt([
            {
                 type:'input',
                 name:'Item_id',
                 Massage:"Enter product name:"
        },
        {
            type:'input',
            name:'qty',
            Massage:"Please Enter quantity you went add: "
            },
         {
            type:'confirm',
            name:'confirm',
            Massage:"Are you shore?"
            }

         ]).then(function (input) {

            var item = input.Item_id;
            var qty = parseInt(input.qty);
            var queryStr = 'SELECT * FROM products WHERE ?';
            
        con.query(queryStr, {item_id: item}, function(err, data) {

            if (data.length === 0) 
            {
            console.log(chalk.red('ERROR: Invalid Item ID. Please select a valid Item ID.'));
                

            } else {
                var res_Data = data[0];
                             
               // console.log(qty)
                    if (data[0].Stock_quantity!==0) {
                              //  console.log(data)
                        var sum=parseInt(res_Data.Stock_quantity) +parseInt(qty);

                       var updateQueryStr = 'UPDATE products SET stock_quantity = ' + sum + ' WHERE item_id = ' + item;
    
                        con.query(updateQueryStr, function(err, data) {
                            if (err) throw err;
                            
                            console.log(chalk.green('--------------------------Successfully Added to Inventory-----------------------'));
                                                         
                                                                 con.end();
                        })
                    } else {
                        console.log(chalk.red('--------------------------Sorry, Insufficient quantity!'+'\n'
                       
                                          +'                            Please modify your order.'+'-----------------------------------'+'\n'));
                        

                       // displayInventory();
                    }
           }
        });

        
        
     });

} else if (res.choise === "Add New Product") {

        inquirer.prompt([
            {
                type:'input',
                name:'prduct_name',
                Massage:"Enter product name:"
            },
            {
                type:'input',
                name:'Department_name',
                Massage:"Enter Department name:" 
            
            },

            {
                type:'input',
                name:'price',
                Massage:"Enter each price:" 
            
            },
            {
                type:'input',
                name:'qty_add',
                Massage:"Quantity?" 
            
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