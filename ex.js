
var http = require('http');
var mysql = require('mysql');
http.createServer(function (req, res) {
    fetchdata(res);
}).listen(8080);


var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "menu"
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected to Database!");
});


function executeQuery(sql, cb) {
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        cb(result);
    });
}


function fetchdata(res){
        executeQuery("SELECT * FROM items order by c_id", function(result){
        res.write("<table>");
        res.write("<tr>");
        for(var column in result[0]){
            res.write("<td><label> " + column + "   </label></td>");
        }
        res.write("</tr>");
        for(var row in result){
            res.write("<tr>");
            for(var column in result[row]){
                res.write("<td><label>  " + result[row][column] + "</label></td>");       
            }
            res.write("</tr>");         
        }
        res.write("</table>");

    });


        executeQuery("SELECT * FROM categories order by c_id", function(result){
        res.write("<table>");
        res.write("<tr>");
        for(var column in result[0]){
            res.write("<td><label> " + column + "   </label></td>");
        }
        res.write("</tr>");
        for(var row in result){
            res.write("<tr>");
            for(var column in result[row]){
                res.write("<td><label>  " + result[row][column] + "</label></td>");       
            }
            res.write("</tr>");         
        }
        res.write("</table>");
    });
}