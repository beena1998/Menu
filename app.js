express= require('express');
 var mysql = require('mysql');
bodyParser=require('body-parser');
path= require('path');
app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(__dirname + '/public'));

var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "menu"
});

con.connect(function(error) {
  if(error){
    throw error;
  }
  else{
    console.log("DB Connected");
  }
});
  

app.get('/users/add',function(req,res){
	
    res.render('index2');
});


app.post('/users/add',function(req,res){
  console.log(req.body);
  res.json(JSON.parse(req.body.data));
});

app.get('/views/index3',function(req,res){
    res.render('index3');
});

app.post('/views/index3',function(req,res){
  // var addUser={
  //   uname:req.body.uname,
  //   mbno:req.body.mbno
  // }
  var data = JSON.parse(req.body.data);
  var item_list = [];
  for (key in data.oderList){
    item_list.push(data.oderList[key]);
  }
  item_list.push(data.userData.mobileno);
  console.log(item_list);
  var qry = `insert into orders values(?)`;
  var sql=`insert into details(uname,mbno) values('${data.userData.name}','${data.userData.mobileno}')`;
  con.query(sql, function (err, result) {
    // if (err) throw err;
    if(err) res.send('err');
    else{
      con.query(qry,[item_list],(err)=>{
        if(err){
          console.log(err);
          res.send('err');
        }
        else{
          res.send("ok");
        }
      });
    }
  });
   
});



// app.post('/users/add',function(req,res){
//     var newUser={
//     	first_name:req.body.first_name,
//     	last_name:req.body.last_name
//     }
//     console.log(newUser);
     // var sql = `INSERT INTO details (first_name, last_name) VALUES ('${newUser.first_name}', '${newUser.last_name}')`;
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });
//     res.send("done");
// });
app.listen(3000,function(){
	console.log('Serve started on port 3000.....');
});