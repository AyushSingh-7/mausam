const express = require("express");
const https = require("https");
const bodyparsar = require("body-parser");
const { response } = require("express");

var weatherdata=""
var city=""
const app = express();
app.set('view engine', 'ejs')
app.use(bodyparsar.urlencoded({ extended: true }));
app.use(express.static("public"))





app.get("/", function (req, res) {

if(weatherdata!="")
{
   var c=Math.round(weatherdata.main.temp-273)+"  \xB0C"
   var i=weatherdata.weather[0].description
       
                    var icon=weatherdata.weather[0].icon
                     var image="http://openweathermap.org/img/wn/"+icon+"@2x.png"
        
       if(city==="enter a correct city name")
         {
             c="";
             i="";
             image=""

         }
        //    res.render("index", {temperature:c,description:i});
        res.render("index",{temperature:c,photo:image,description:i,cityname:city} );
            // res.render("index", {icon:image});
     
}

else
res.render("index", {temperature:"",description:""});
     
        
        
        
        
        
        
        });
        
        
    



app.post("/",function(req,res){
    

 city=req.body.cityname

console.log(city)
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=9c689905446ba65a7d5046fdbf67c444"

    https.get(url, function (response) {

console.log(response.statusCode)
if(response.statusCode===404)
 {res.redirect("/")
city="enter a correct city name"   

}
 else{
        response.on("data", function (data) {
             weatherdata = JSON.parse(data)
            //  te=weatherdata.main.temp
            //  im=weatherdata.weather[0].description
           
           

    });
    res.redirect("/")
 }
   

});





})

app.listen(3000, function () {
    console.log("server is running");
})