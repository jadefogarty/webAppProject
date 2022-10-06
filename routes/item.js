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
    var viewItems = connection.query('SELECT * from item');
    console.log(viewItems); 
    

    res.render('item', { 
        title: 'Item Table',
        viewItems: viewItems
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
  connection.query('INSERT INTO item(Item_id, Item_name, Item_desc, Item_quantity) VALUES ((?), (?), (?), (?))', [req.body.Item_id, req.body.Item_name, req.body.Item_desc, req.body.Item_quantity]);

  console.log(req.body.Item_id);
  console.log(req.body.Item_name);
  console.log(req.body.Item_desc);
  console.log(req.body.Item_quantity);
  res.redirect("/item");
})


//to delete from table
router.get('/delete', function(req, res, next){
    var delete_id = req.query.Item_id
    var delete_name = req.query.Item_name
   
    var connection = new MySql({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'hnretail'
    });
    connection.query("DELETE FROM item where Item_id = (?) or Item_name = (?);", [delete_id, delete_name]);
    res.redirect('/item');
});




//to choose which object to edit
router.get('/update', function(req, res, next){
    var Item_id = req.query.Item_id
    var error = req.query.error
    res.render('update_item', {Item_id: Item_id, error: error});

});


//to edit
router.post('/update', function(req, res, next){
    var Item_id = req.body.Item_id
    var newItem_name = req.body.newItem_name
    var newItem_desc = req.body.newItem_desc
    var newItem_quantity = req.body.newItem_quantity

    var connection = new MySql({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'hnretail'
    });
    var query_string = "UPDATE item SET"
    var params = []
    if(newItem_name){
        query_string += ' Item_name = (?)'
        params.push(newItem_name)
    }
    if(newItem_desc){
        query_string += ' Item_desc = (?)'
        params.push(newItem_desc)
    }
    if(newItem_quantity){
        query_string += ' Item_quantity = (?)'
        params.push(newItem_quantity)
    }
    query_string += ' WHERE Item_id = (?)'
    if(!newItem_name && !newItem_desc && !newItem_quantity){
        res.redirect('/item/update?Item_id=' + Item_id+ "&error=You must update some fields")
    }
    params.push(Item_id)
    connection.query(query_string, params)
    res.redirect('/item')

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