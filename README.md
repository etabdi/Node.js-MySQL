# Node.js-MySQL

# Liri-node-app

Amazon-like storefront with the MySQL. The app will take in orders from customers and deplete stock from the store's inventory And also  track product sales across your store's departments and then provide a summary of the highest-grossing departments in the store.

There will be three view;

     node bamazonCustomer.js  (Customer View )
     Manager View 
     Supervisor View
     

## What Each Command Do

    
[ Click here for demo video ](https://drive.google.com/file/d/1ZsKnY4o8fqjJijelUG8TQaGk7-GVJ9nY/view)

### node bamazonCustomer.js  (Customer View )

  Populate products for sell from Mysql database, will provide acess user order online. Once user place order app will calculate order total give summery of orde.


     Name of the venue
     Venue location
     Date of the Event ("MM/DD/YYYY") 
   ![Alt Text](https://node_modules/Manager.PNG)

### node liri.js spotify-this-song 'song name here'

   This will show the following information about the song in user terminal/bash window
   
         item_id (unique id for each product)
         product_name (Name of product)
         department_name
         price (cost to customer)
         stock_quantity (how much of the product is available in stores)
         
   ![Alt Text](https://github.com/etabdi/Node.js-MySQL/img/Manager.PNG)
   
   If no song is provided then your program will default to "The Sign" by Ace of Base.

###   node bamazonManager.js (Manager view)
 
 Node application called bamazonManager.js. Running this application will:
 
    List a set of menu options:
      View Products for Sale
      View Low Inventory
      Add to Inventory
      Add New Product
   ![Alt Text](https://github.com/etabdi/liri-node-app/blob/master/images/movie-this.png)
  If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
  If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
  If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
  If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
  
### node bamazonSupervisor.js (supervisor view)

     Running this application will list a set of menu options:
        View Product Sales by Department
        Create New Department

 Each command user run result will save to log.txt file. 
    ![Alt Text](https://github.com/etabdi/liri-node-app/blob/master/images/log.PNG)
    


   ## TECHNOLOGIES USED

       MYSQL Data BASE
       NODE JS
       Javascript
       Node packages(mysql NPM,chalk NPM,inquirer NPM)
       Request
 
   

