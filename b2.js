var http = require('http');
var fs = require('fs');
 
http.createServer(function(request, response) {
	fs.readFile("pra.html", function(err, data){
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write(data);
  response.end();
});
	if(/^\/[a-zA-Z0-9\/]*.css$/.test(request.url.toString())){
   sendFileContent(response, request.url.toString().substring(1), "text/css");
}
 
function sendFileContent(response, fileName, contentType){
  fs.readFile(fileName, function(err, data){
    if(err){
      response.writeHead(404);
      response.write("Not Found!");
    }
    else{
      response.writeHead(200, {'Content-Type': contentType});
      response.write(data);
    }
    response.end();
  });
}
}).listen(8080);
