/* looked at and altered code from class example 'staff-todos' from Web Application Development moodle page */
var express = require('express');
var router = express.Router();
var MySql = require('sync-mysql')

//to view table
router.get('/', function(req, res, next) {
   var connection = new MySql({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'hnretail'
    });
    var viewCustomer = connection.query('SELECT * from customer');
    console.log(viewCustomer); 
    

    res.render('customer', { 
        title: 'Customer Table',
        viewCustomer: viewCustomer
    });
  });


//to add to table
router.post('/add', function(req, res, next){
  var connection = new MySql({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'hnretail'
  });
  connection.query('INSERT INTO customer(Cust_id, C_name, C_address, C_city, C_country, Bill_id, Telephone) VALUES ((?), (?), (?), (?), (?), (?), (?))', [req.body.Cust_id, req.body.C_name, req.body.C_address, req.body.C_city, req.body.C_country, req.body.Bill_id, req.body.Telephone]);

  console.log(req.body.Cust_id);
  console.log(req.body.C_name);
  console.log(req.body.C_address);
  console.log(req.body.C_city);
  console.log(req.body.C_country);
  console.log(req.body.Bill_id);
  console.log(req.body.Telephone);
  res.redirect("/customer");
})


//to delete from table
router.get('/delete', function(req, res, next){
    var delete_id = req.query.Cust_id
    var delete_name = req.query.C_name
   
    var connection = new MySql({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'hnretail'
    });
    connection.query("DELETE FROM customer where Cust_id = (?) or C_name = (?);", [delete_id, delete_name]);
    res.redirect('/customer');
});




//to choose which object to edit
router.get('/update', function(req, res, next){
    var Cust_id = req.query.Cust_id
    var error = req.query.error
    res.render('update_customer', {Cust_id: Cust_id, error: error});

});


//to edit
router.post('/update', function(req, res, next){
    var Cust_id = req.body.Cust_id
    var newC_name = req.body.newC_name
    var newC_address = req.body.newC_address
    var newC_city = req.body.newC_city
    var newC_country = req.body.newC_country
    var newBill_id = req.body.newBill_id
    var newTelephone = req.body.newTelephone

    var connection = new MySql({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'hnretail'
    });
    var query_string = "UPDATE customer SET"
    var params = []
    if(newC_name){
        query_string += ' C_name = (?)'
        params.push(newC_name)
    }
    if(newC_address){
        query_string += ' C_address = (?)'
        params.push(newC_address)
    }
    if(newC_city){
        query_string += ' C_city = (?)'
        params.push(newC_city)
    }
    if(newC_country){
        query_string += ' C_country = (?)'
        params.push(newC_country)
    }
    if(newBill_id){
        query_string += ' Bill_id = (?)'
        params.push(newBill_id)
    }
    if(newTelephone){
        query_string += ' Telephone = (?)'
        params.push(newTelephone)
    }
    query_string += ' WHERE Cust_id = (?)'
    if(!newC_name && !newC_address && !newC_city && !newC_country && !newBill_id && !newTelephone){
        res.redirect('/customer/update?Cust_id=' + Cust_id+ "&error=You must update some fields")
    }
    params.push(Cust_id)
    connection.query(query_string, params)
    res.redirect('/customer')

});



//to go to another pager
router.get('/order', function(req, res){
    res.render("order", {})
});
router.get('/', function(req, res){
    res.render("", {})
});
router.get('/customer', function(req, res){
    res.render("customer", {})
});
router.get('/contents', function(req, res){
    res.render("contents", {})
});
router.get('/billing', function(req, res){
    res.render("billing", {})
});
router.get('/item', function(req, res){
    res.render("item", {})
});


module.exports = router;