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
    var viewBilling = connection.query('SELECT * from billing');
    console.log(viewBilling); 
    

    res.render('billing', { 
        title: 'Billing Table',
        viewBilling: viewBilling
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
  connection.query('INSERT INTO billing(Bill_id, Card_num, Expiry, Sec_code) VALUES ((?), (?), (?), (?))', [req.body.Bill_id, req.body.Card_num, req.body.Expiry, req.body.Sec_code]);

  console.log(req.body.Bill_id);
  console.log(req.body.Card_num);
  console.log(req.body.Expiry);
  console.log(req.body.Sec_code);
  res.redirect("/billing");
})


//to delete from table
router.get('/delete', function(req, res, next){
    var delete_id = req.query.Bill_id
   
    var connection = new MySql({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'hnretail'
    });
    connection.query("DELETE FROM billing where Bill_id = (?);", [delete_id]);
    res.redirect('/billing');
});




//to choose which object to edit
router.get('/update', function(req, res, next){
    var Bill_id = req.query.Bill_id
    var error = req.query.error
    res.render('update_billing', {Bill_id: Bill_id, error: error});

});


//to edit
router.post('/update', function(req, res, next){
    var Bill_id = req.body.Bill_id
    var newCard_num = req.body.newCard_num
    var newExpiry = req.body.newExpiry
    var newSec_code = req.body.newSec_code

    var connection = new MySql({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'hnretail'
    });
    var query_string = "UPDATE billing SET"
    var params = []
    if(newCard_num){
        query_string += ' Card_num = (?)'
        params.push(newCard_num)
    }
    if(newExpiry){
        query_string += ' Expiry = (?)'
        params.push(newExpiry)
    }
    if(newSec_code){
        query_string += ' Sec_code = (?)'
        params.push(newSec_code)
    }
    query_string += ' WHERE Bill_id = (?)'
    if(!newCard_num && !newExpiry && !newSec_code){
        res.redirect('/billing/update?Bill_id=' + Bill_id+ "&error=You must update some fields")
    }
    params.push(Bill_id)
    connection.query(query_string, params)
    res.redirect('/billing')

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