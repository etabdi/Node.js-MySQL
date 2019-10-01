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

 Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
   ![Alt Text](https://github.com/etabdi/Node.js-MySQL/blob/master/img/customer1.PNG)
   
  The app wll then prompt users with two messages.

   The first should ask them the ID of the product they would like to buy.
   The second message should ask how many units of the product they would like to buy.
     ![Alt Text](https://github.com/etabdi/Node.js-MySQL/blob/master/img/order.PNG)
   
      Once user place order app will calculate order total give summery of orde. 

###   node bamazonManager.js (Manager view)
 
 Node application called bamazonManager.js. Running this application will:
      List a set of menu options:
      View Products for Sale
      View Low Inventory
      Add to Inventory
      Add New Product
   ![Alt Text](https://github.com/etabdi/liri-node-app/blob/master/img/Produc sales.PNG)
   
        View Products for Sale - 
        the app should list every available item: the item IDs, names, prices, and quantities.
        
        
        View Low Inventory option
          Will display list all items with an inventory count lower than five.
             ![Alt Text](https://github.com/etabdi/Node.js-MySQL/blob/master/img/low_invontory.PNG)
             
      Add to Inventory
          App wll display a prompt that will let the manager "add more" of any item currently in the store.
               ![Alt Text](https://github.com/etabdi/Node.js-MySQL/blob/master/img/add_inv.PNG)
               
          Add New Product         
             allow the manager to add a completely new product to the store.
                 ![Alt Text](https://github.com/etabdi/Node.js-MySQL/blob/master/img/add%20_new_product.PNG)
  
### node bamazonSupervisor.js (supervisor view)

     Running this application will list a set of menu options:
        View Product Sales by Department
        Create New Department

 Each command user run result will save to log.txt file. 
    ![Alt Text](https://github.com/etabdi/Node.js-MySQL/img/Manager.PNG)
    


   ## TECHNOLOGIES USED

       MYSQL Data BASE
       NODE JS
       Javascript
       Node packages(mysql NPM,chalk NPM,inquirer NPM)
       Request
 
   

