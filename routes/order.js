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
    var viewOrder = connection.query('SELECT * from ordertable');
    console.log(viewOrder); 
    

    res.render('order', { 
        title: 'Order Table',
        viewOrder: viewOrder
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
  connection.query('INSERT INTO ordertable(Order_id, Cust_id, Cont_id) VALUES ((?), (?), (?))', [req.body.Order_id, req.body.Cust_id, req.body.Cont_id]);

  console.log(req.body.Order_id);
  console.log(req.body.Cust_id);
  console.log(req.body.Cont_id);
  res.redirect("/order");
})


//to delete from table
router.get('/delete', function(req, res, next){
    var delete_id = req.query.Order_id
   
    var connection = new MySql({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'hnretail'
    });
    connection.query("DELETE FROM ordertable where Order_id = (?);", [delete_id]);
    res.redirect('/order');
});




//to choose which object to edit
router.get('/update', function(req, res, next){
    var Order_id = req.query.Order_id
    var error = req.query.error
    res.render('update_order', {Order_id: Order_id, error: error});

});


//to edit
router.post('/update', function(req, res, next){
    var Order_id = req.body.Order_id
    var newCust_id = req.body.newCust_id
    var newCont_id = req.body.newCont_id

    var connection = new MySql({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'hnretail'
    });
    var query_string = "UPDATE ordertable SET"
    var params = []
    if(newCust_id){
        query_string += ' Cust_id = (?)'
        params.push(newCust_id)
    }
    if(newCont_id){
        query_string += ' Cont_id = (?)'
        params.push(newCont_id)
    }
    query_string += ' WHERE Order_id = (?)'
    if(!newCust_id && !newCont_id){
        res.redirect('/order/update?Order_id=' + Order_id+ "&error=You must update some fields")
    }
    params.push(Order_id)
    connection.query(query_string, params)
    res.redirect('/order')

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