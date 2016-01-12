var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'jade');

app.get("/", function(request, response) {
  
  var ip = request.header('x-forwarded-for') || request.connection.remoteAddress;
  var lang = request.header('accept-language').split(",")[0];
  var os = request.header('user-agent').match(/\(([^)]+)\)/)[1];
    
  response.end(JSON.stringify({"ipaddress":ip,"language":lang,"software":os}));
  

});

app.listen(app.get('port'));
