//Get the IP address first
var xhttp2 = new XMLHttpRequest();
var url2 = "http://ipinfo.io/json" //API IP lookup
console.log(url2);
//xhttp2.addEventListener('load', processResponse2); //once it's loaded, run the fuction
//xhttp2.open('GET', url2);
//xhttp2.send();


var processResponse2 = function(){ //do this after getting IP response
 //   var data = JSON.parse(this.response); //make it readable
 //   var location = data.loc; //the location in response of info i need
 //   var array = location.split(',') //location comes back as list __,__, split it into an array
    var lat = 51.5000;
    var lng = -3.2000;
   // console.log(array);
    //Now we have IP address, can look up weather
    var url = "http://api.openweathermap.org/data/2.5/weather";
    var query_url = url + "?" + "lat=" + lat + "&lon=" + lng + "&appid=" + "bd9103bac697c788ceb38ef0aaac11d7"; //API key
    var xhttp = new XMLHttpRequest(); //send off weather request
    xhttp.addEventListener('load', processResponse);
    xhttp.open('GET', query_url);
    xhttp.send();
}
//Do this with weather info
var processResponse = function(){
    var data = JSON.parse(this.response);
    console.log(data);
    
    var body = document.getElementsByTagName('body')[0];
    var weather_str = "The Weather at the moment is " + data.weather[0].description;
    console.log(weather_str);
    
    var text = document.createTextNode(weather_str);
    var paragraph = document.createElement('p');
    paragraph.appendChild(text);
    body.appendChild(paragraph);
};

processResponse2();