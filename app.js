const express = require("express");
const https = require("https"); 
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({extended : true}));



app.get("/", function(req,res){

 
        res.sendFile(__dirname+"/index.html")

           
})


app.post("/", function(req,res){

    console.log("Post request");
  
    const query = req.body.cityName;
    const apiKey = "8dcbdb9dee6aefbf969dc367cfc55fbf";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    https.get(url, function(response){
        console.log(response.statusCode)
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon =  weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The temperature in "+ query +" is " + temp + " degrees Celcius. </h1>")
            res.write("<p>The weather is currently " + description +".</p>")
            res.write("<img src="+imageURL+">");
            res.send();
        });
    });
})








app.listen(3000, function(){

    console.log("Server running on port 3000");

});



