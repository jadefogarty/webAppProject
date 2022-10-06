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
    var viewContents = connection.query('SELECT * from contents');
    console.log(viewContents); 

    res.render('contents', { 
        title: 'Contents Table',
        viewContents: viewContents
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
  connection.query('INSERT INTO contents(Cont_id, Item_id, Quantity) VALUES ((?), (?), (?))', [req.body.Cont_id, req.body.Item_id, req.body.Quantity]);

  console.log(req.body.Cont_id);
  console.log(req.body.Item_id);
  console.log(req.body.Quantity);
  res.redirect("/contents");
})


//to delete from table
router.get('/delete', function(req, res, next){
    var delete_id = req.query.Cont_id
   
    var connection = new MySql({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'hnretail'
    });
    connection.query("DELETE FROM contents where Cont_id = (?);", [delete_id]);
    res.redirect('/contents');
});




//to choose which object to edit
router.get('/update', function(req, res, next){
    var Cont_id = req.query.Cont_id
    var error = req.query.error
    res.render('update_contents', {Cont_id: Cont_id, error: error});

});


//to edit
router.post('/update', function(req, res, next){
    var Cont_id = req.body.Cont_id
    var newItem_id = req.body.newItem_id
    var newQuantity = req.body.newQuantity

    var connection = new MySql({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'hnretail'
    });
    var query_string = "UPDATE contents SET"
    var params = []
    if(newItem_id){
        query_string += ' Item_id = (?)'
        params.push(newItem_id)
    }
    if(newQuantity){
        query_string += ' Quantity = (?)'
        params.push(newQuantity)
    }
  
    query_string += ' WHERE Cont_id = (?)'
    if(!newItem_id && !newQuantity){
        res.redirect('/contents/update?Cont_id=' + Cont_id+ "&error=You must update some fields")
    }
    params.push(Cont_id)
    connection.query(query_string, params)
    res.redirect('/contents')

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