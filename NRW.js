/*

NATURAL RESOURCES WALES API FOR THE WEBSITE HEADER

LOOKS UP IF THERE IS A FLOOD RISK

NATIONAL OUTLOOK

WORKS FULLY VERSION 27/12/16

NOTE: DOES NOT WORK IN GOOGLE CHROME ATM


*/

var url = "https://api.naturalresources.wales/floodforecast/v1/summary";

var processResponse = function(){
    var data = JSON.parse(this.response);
    console.log(data);
    var engFlood = data.Summary_en;
    var cyFlood = data.Summary_cy;
    console.log(engFlood);
    console.log(cyFlood);
    
    
    
    var text = document.createTextNode(engFlood);
    var h3 = document.createElement('h3');
    var header = document.createElement('header');
    header.className += "floodHeader"; 
    h3.appendChild(text);
    header.appendChild(h3);
    body.insertBefore(header, body.childNodes[0]);    
    
    
};




var body = document.getElementsByTagName('body')[0];
xhttp = new XMLHttpRequest();
xhttp.addEventListener('load', processResponse);
xhttp.open('GET', url);
xhttp.setRequestHeader('Content-Type', 'text/plain');
xhttp.setRequestHeader('Ocp-Apim-Subscription-Key', 'c5b39d32fe8b42debe93890722276ca3');
xhttp.setRequestHeader('Allow-Control-Allow-Origin', '*');
xhttp.send();
console.log("ready");


