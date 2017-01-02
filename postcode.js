var processResponseInnerWeather = function(){
    var data = JSON.parse(this.response);
    console.log(data);
    var body = document.getElementsByTagName('body')[0];
    var weather_str = "The Weather at the moment is " + data.weather[0].description;
    console.log(weather_str);
        
        
    //More accurate weather background once we know the postcode
        
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
    
    var text = document.createTextNode(weather_str);
    var h3 = document.createElement('h3');
    var header = document.createElement('header');
    header.className += "weatherHeader"; 
    h3.appendChild(text);
    header.appendChild(h3);
    body.insertBefore(header, body.childNodes[0]); 
    
};

var getWeatherFromPostcode = function(lat, lng){
    var url = "http://api.openweathermap.org/data/2.5/weather";
    var query_url = url + "?" + "lat=" + lat + "&lon=" + lng + "&appid=" + "bd9103bac697c788ceb38ef0aaac11d7"; //API key
    console.log(query_url);
    var xhttp = new XMLHttpRequest(); //send off weather request
    xhttp.addEventListener('load', processResponseInnerWeather);
    xhttp.open('GET', query_url);
    xhttp.send();
};


// SEE THE LOCAL RIVER LEVELS
var body = document.getElementsByTagName('body')[0];
var localRiverLevel = function(lat, lng){
    
    //CODE FROM NATURAL RESOURCES WALES
    
    $(function() {
        
        $.ajax({
            url: "https://api.naturalresources.wales/riverlevels/v1/distance/10000/latlon/" + lat + "/" + lng,
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","9bf5522011f24e9d91f1259829a17cea");
                xhrObj.setRequestHeader("Content-Type", 'application/json');
            },
            type: "GET",  
        })
        .done(function(data) {
            console.log("success river");
            console.log(data);
            
            var stuff = data;
            floodcount = 0;
            
            var section = document.createElement('section');
            section.className = "riverLevelSection";
            
            var mapDiv = document.createElement('div');
            mapDiv.setAttribute("id", "mapid");
            
            
            var sectionMap = document.createElement('section');
            sectionMap.setAttribute("class", "mapThing");
            sectionMap.appendChild(mapDiv);
            
            body.insertBefore(sectionMap, body.childNodes[3]);
        
            var mymap = L.map('mapid').setView([lat, lng], 11);
     
            
            
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                maxZoom: 18,
                id: 'rivermaps.2ho23pf7',
                accessToken: 'pk.eyJ1Ijoicml2ZXJtYXBzIiwiYSI6ImNpeGdraWxxMjAwMGwydHAzbjJtN2hqdG4ifQ.bIigaZZRBCzYqW70_ivtGA'
            }).addTo(mymap);
            
            var marker = L.marker([lat, lng]).addTo(mymap);
            marker.bindPopup("Your location").openPopup();
            
            while (floodcount <3){
                
                var oneRiver = document.createElement('div');
                oneRiver.className = "oneRiver";
                
                var coordinates = stuff.search("-");
                coordinates = stuff.substring(coordinates, (coordinates+35));
                console.log(coordinates);
                
                var coordinates = coordinates.split(", ");
                var riverLng = coordinates[0];
                var riverLat = coordinates[1];
                
                console.log (riverLng);
                console.log(riverLat);
                
                var marker = L.marker([riverLat, riverLng]).addTo(mymap);
                
                
                var riverName = stuff.search("NameEN");
                riverName = riverName + 11;
                riverName = stuff.substring(riverName);
                var endSearch = riverName.search("\"");
                //console.log(endSearch);
                riverName = riverName.substring(0, endSearch);
                console.log(riverName);
                
                var riverNameText = document.createTextNode(riverName);
                var h3 = document.createElement('h3');
                h3.appendChild(riverNameText);
                oneRiver.appendChild(h3);
                
                var units = stuff.search("Units");
                units = units + 10;
                units = stuff.substring(units);
                var endSearchUnits = units.search("\"");
                
                units = units.substring (0, endSearchUnits);
                console.log(units);
                
                
                var latestValue = stuff.search("LatestValue");
                latestValue = latestValue + 16;
                latestValue = stuff.substring(latestValue);
                var endSearchValue = latestValue.search("\"");
                //console.log(endSearchValue);
                latestValue = latestValue.substring(0, endSearchValue);
                console.log(latestValue);
                
                var latestValueText = document.createTextNode(latestValue + units);
                var h5 = document.createElement('h5');
                h5.appendChild(latestValueText);
                oneRiver.appendChild(h5);
                
                var riverURL = stuff.search("url");
                riverURLvalue = riverURL + 8;
                riverURL = stuff.substring(riverURLvalue);
                var endSearchUrl = riverURL.search("\"");
                //console.log(endSearchUrl);
                riverURL = riverURL.substring(0, endSearchUrl);
                console.log(riverURL);
                
               
                
                
                
                var linkDiv = document.createElement('div');
                linkDiv.setAttribute("class", "floodInfoLink");
                var a = document.createElement("a");
                
                var h6 = document.createElement("h6");
                
                var buttonText=document.createTextNode("More Info");
                a.appendChild(buttonText);
                a.setAttribute("href", riverURL);
                h6.appendChild(a);
                linkDiv.appendChild(h6);
                oneRiver.appendChild(linkDiv);
                
                
               marker.bindPopup(riverName + " " + latestValue + units + " " + riverURL);
                
                
                //type="reset" onclick="location.href='http://www.example.com'"
                
                
                /*<form>
                <button formaction="http://stackoverflow.com">Go to stackoverflow!</button>
                </form>
                
                document.getElementsByTagName("H1")[0].setAttribute("class", "democlass");
                */
                
                
                
                section.appendChild(oneRiver);
                
                
                stuff = stuff.substring((endSearchUrl+riverURLvalue));
                floodcount++;
            };
            
            
            body.insertBefore(section, body.childNodes[3]);
            
            
            
            
        })
        .fail(function() {
            alert("error river");
            console.log(data);
        });
    });
    
};

// SEE IF THERE IS A LOCAL FLOOD RISK IN PLACE
var localFloodDetail = function(county){
    
    var localFloodURL = "https://api.naturalresources.wales/floodforecast/v1/areasatrisk?LocationCounty_en=" + county;
    
    // CODE FROM NATURAL RESOURCES WALES 
        $(function() {
        $.ajax({
            url: localFloodURL,
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","c5b39d32fe8b42debe93890722276ca3");
            },
            type: "GET",
        })
        .done(function(data) {
            console.log("success");
            console.log(data);
            for (w=0; w<data.length;w++){
                console.log(data[w]);
                
                if (data[w].LocationCounty_en === county){
                    alert("There is a flood alert in your area for the ", data[w].Day_en, ".  It is ", data[w].RiskLevelName_en);
                }
            };   
            
        })
        .fail(function() {
            console.log("error");
        });
    });
};


/*

*****GETTING THE POST CODE AND DETAILS FROM THAT

*/

var floodAlert = function(){
    
    var floodReact = function(){
        var dataPC = JSON.parse(this.response);
        console.log(dataPC);
    };
  
    var searchTerm = document.getElementById('search_termPostCode').value;
    var postCodeSearchURL = "http://uk-postcodes.com/postcode/" ;
    var dataType = '.json';
    var postCodeSearch = postCodeSearchURL + searchTerm + dataType;
    console.log(postCodeSearch);
    
    
    $.getJSON( postCodeSearch, function( data ) {
        console.log(data);
        
        var lat = data.geo.lat;
        var lng = data.geo.lng;
        var county = data.administrative.council.title;
        localFloodDetail(county);
        localRiverLevel(lat, lng);
        console.log(county);
        console.log(lat);
        console.log(lng);
        getWeatherFromPostcode(lat, lng);
    });
};


console.log('ready');
var search_button = document.getElementById('search_buttonPostCode');
search_button.addEventListener('click', floodAlert);


