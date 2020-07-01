const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");
   
});

app.post("/",function(req,res){
    
    const city =req.body.cityName


    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +city+ "&units=metric&appid=090c153840c925aa15f8354eb7599912";
  
    https.get(url, function (response) {
      response.on("data", function (data) {
        const weatherData = JSON.parse(data);
        var temp = weatherData.main.temp;
        var description = weatherData.weather[0].description;
        var image = weatherData.weather[0].icon;
        var imageURL = "http://openweathermap.org/img/wn/" + image + "@2x.png";
  
        // res.write("<h3>The weather is currently</h3>" + description);
        // res.write("<h1>The temp of city " +city + " is " + temp + " C</h1>");
        // res.write("<img src=" + imageURL + ">");
        res.send("<h3>The weather is currently " + description + "</h3><h1>The temp of city " +city + " is " + temp + " C</h1><img src=" + imageURL + ">");
      });
    });
})

app.listen(1234, function () {
  console.log("Server is runnning");
});
