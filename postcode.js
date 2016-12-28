// SEE THE LOCAL RIVER LEVELS
var body = document.getElementsByTagName('body')[0];
var localRiverLevel = function(lat, lng){
    
    //CODE FROM NATURAL RESOURCES WALES
    
    $(function() {
        var params = {
            // Request parameters
        };
      
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
            
            while (floodcount <3){
                
                var oneRiver = document.createElement('div');
                oneRiver.className = "oneRiver";
                
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
                
                
                var latestValue = stuff.search("LatestValue");
                latestValue = latestValue + 16;
                latestValue = stuff.substring(latestValue);
                var endSearchValue = latestValue.search("\"");
                //console.log(endSearchValue);
                latestValue = latestValue.substring(0, endSearchValue);
                console.log(latestValue);
                
                var latestValueText = document.createTextNode(latestValue);
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
                //var riverFloodLevelLink = document.createElement("a");
                
                
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
        
    });
};

window.onload = function(){
    console.log('ready');
    var search_button = document.getElementById('search_buttonPostCode');
    search_button.addEventListener('click', floodAlert);
};

