var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'jade');

app.get("/", function(request, response) {
  response.render("index");
});

app.get("/:date", function(request, response) {
  var date = request.params.date;
  var unixDate = null;
  var naturalDate = null;

  if(date.match(/^\d+$/g) !== null) // unix
  {
    unixDate = Number(date);
    naturalDate = toNatural(date);
  }
  else if(date.match(/^\w+ \d{1,2}, \d+$/) !== null)
  { 
    unixDate = toUnix(date);
    naturalDate = unixDate == null? null:date;
  }
  var json = JSON.stringify({"unix":unixDate,"natural":naturalDate});
  response.send(json);

});

app.listen(app.get('port'));

function toNatural(dateParam)
{
  var date = new Date();
  date.setTime(Number(dateParam)*1000);
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return (months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear());
}

function toUnix(date)
{
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  
  var month = date.split(",")[0].split(" ")[0];
  var day = date.split(",")[0].split(" ")[1];
  var year = date.split(",")[1];
 
  if(months.indexOf(month) == -1)
    return null;
  
  if((day < 1)||(day > 31))
    return null;
  
  var unix = new Date(month+" "+day+", "+year);
  return Number(unix.getTime()/1000);
}
