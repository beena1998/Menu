var http = require('http');  
http.createServer(function(req, res) {  
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.write('<!doctype html>\n<html lang="en">\n' + '<head> <script>function myFunction(){var i=getElementById("name").innerHTML; '+
   ' console.log(i);}</script></head>'+
    '\n<meta charset="utf-8">\n<title>Test web page on node.js</title>\n' + 
    '<style type="text/css">* {font-family:arial, sans-serif;}</style>\n' + 
    '\n\n<h1>Enter your details!!</h1>\n' + 
    'Name:<input type=text id="name">' + 
    '\n\n'+' Class:<input type=text id="cl" placeholder="Enter ur class">'+'<button onclick="myFunction()">Click me</button>');
  res.end();
}).listen(8080, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8080');