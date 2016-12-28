var gettingTheWeatherBackground = function(){

    var processResponse2 = function(){
        //do this after getting IP response
        var data = JSON.parse(this.response); //make it readable
        console.log(data);
        var location = data.loc; //the location in response of info i need
        var array = location.split(',') //location comes back as list __,__, split it into an array
        console.log(array);
        var lat = array[0];
        var lng = array[1];

        getWeather(lat, lng);

    };

    var processResponse = function(){
        var data = JSON.parse(this.response);
        console.log(data);
        var body = document.getElementsByTagName('body')[0];
        var weather_str = "The Weather at the moment is " + data.weather[0].description;
        console.log(weather_str);
        
        var backHead = document.querySelector("#mainHeader");
        
        var weatherIs = data.weather[0].id;

        if (weatherIs > 200 && weatherIs < 598){
            backHead.style.backgroundImage = 'url("rain.gif")';
        } else if (weatherIs > 599 && weatherIs < 698){
            backHead.style.backgroundImage = 'url("snow.gif")';
        } else if (weatherIs > 699 && weatherIs< 798){
           backHead.style.backgroundImage = 'url("fog.jpg")';
        } else if (weatherIs === 800){
            backHead.style.backgroundImage = 'url("sun.jpg")';
        } else if (weatherIs > 800 && weatherIs< 898){
            backHead.style.backgroundImage = 'url("cloud.gif")';
        } else {
            backHead.style.backgroundImage = 'url("sun.jpg")';
        };

    };

    var getWeather = function(lat, lng){
           var lat = lat;
           var lng = lng;
            //Now we have IP address, can look up weather
            var url = "http://api.openweathermap.org/data/2.5/weather";
            var query_url = url + "?" + "lat=" + lat + "&lon=" + lng + "&appid=" + "bd9103bac697c788ceb38ef0aaac11d7"; //API key
            var xhttp = new XMLHttpRequest(); //send off weather request
            xhttp.addEventListener('load', processResponse);
            xhttp.open('GET', query_url);
            xhttp.send();


        };
    
    var backHead = document.querySelector(".mainHeader");
    //Get the IP address first
    var xhttp2 = new XMLHttpRequest();
    var url2 = "http://ipinfo.io/json" //API IP lookup
    console.log(url2);
    xhttp2.addEventListener('load', processResponse2); //once it's loaded, run the fuction
    xhttp2.open('GET', url2);
    xhttp2.send();
};

gettingTheWeatherBackground();