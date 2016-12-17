// GUARDIAN FEATURE STORY ON A PARTICULAR DAY 

var baseURL = "http://content.guardianapis.com/";

var section = "world";

var date = '2016-08-29';

var guardianAPI = "287b85a3-f275-4340-8d30-d31ee0b4bf94";

var guardianURL = baseURL + section + "?show-editors-picks=true&show-fields=main&from-date=" + date + "&to-date=" + date + "&api-key=" + guardianAPI;

var processResponse = function(){
    
    //make the data we get back easy to understand
    
    var data = JSON.parse(this.response);
    console.log(data);
    var body = document.getElementsByTagName('body')[0];
    
    //get the main story from the response
    i = 0;
    while (i<4){
        
        var top_story = data.response.results[i].webTitle
        console.log(top_story);
    
        //get the main story into the webpage
        var text = document.createTextNode(top_story);
        var paragraph = document.createElement('p');
        paragraph.appendChild(text);
        body.appendChild(paragraph);
    
    
        //get the https of the image that they have used
        var t = data.response.results[i].fields.main;
        var img = t.lastIndexOf("https://");
        img = t.slice(img);
        console.log(img);
        var imgIndex = img.indexOf("\"");
        img = img.slice(0,imgIndex);
        console.log(img);
    
        //puts the image into the main page
        var mainImg=document.createElement("img");
        mainImg.setAttribute('src', img);
        body.appendChild(mainImg);
    
        i++; };
}

xhttp = new XMLHttpRequest();
xhttp.addEventListener('load', processResponse);
xhttp.open('GET', guardianURL);
xhttp.send();

