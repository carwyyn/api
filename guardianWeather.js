// GUARDIAN FEATURE STORY ON A PARTICULAR DAY 


var processResponse = function(){
    
    //make the data we get back easy to understand
    
    var data = JSON.parse(this.response);
    console.log(data);
    var body = document.getElementsByTagName('body')[0];
    
    //get the main story from the response
    i = 0;
    while (i<5){
        
        var top_story = data.response.results[i].webTitle
        console.log(top_story);
        
        //get the https of the image that they have used
        var t = data.response.results[i].fields.main;
        var img = t.lastIndexOf("https://");
        img = t.slice(img);
        console.log(img);
        var imgIndex = img.indexOf("\"");
        img = img.slice(0,imgIndex);
        console.log(img);
    
        //get the main story into the webpage
        
        var text = document.createTextNode(top_story);
        var h3 = document.createElement('h3');
        var section = document.createElement('section');
        section.className = "guardian";
        h3.appendChild(text);
        section.appendChild(h3);
        body.insertBefore(section, body.childNodes[3]);
    
        var backsec = document.getElementsByTagName('section')[0];
        backsec.style.backgroundImage = 'url("'+img+'")';
        
        var pageLink = data.response.results[i].webUrl;
        console.log(pageLink);
        
        var link = document.createElement('a');
        var button = document.createElement('button');
        var checkItOut = document.createTextNode('Check it out >>');
        
        link.setAttribute("href", pageLink);
        button.setAttribute("type", "button");
        button.appendChild(checkItOut);
        link.appendChild(button);
        section.appendChild(link);
        
        
        
        
        
        
        //puts the image into the main page
        //  var mainImg=document.createElement("img");
        //mainImg.setAttribute('src', img);
        //body.appendChild(mainImg);
        
        i++;
    
    };
};


var searchingGuardian=function(){
    
    var baseURL = "http://content.guardianapis.com/search?&show-fields=main&tag=";

    var section = "uk/weather";
    
   // https://content.guardianapis.com/search?tag=environment/recycling 

    var guardianAPI = "287b85a3-f275-4340-8d30-d31ee0b4bf94";

    var guardianURL = baseURL + section + "&api-key=" + guardianAPI;

    xhttp = new XMLHttpRequest();
    xhttp.addEventListener('load', processResponse);
    xhttp.open('GET', guardianURL);
    xhttp.send();

};
    
window.onload = function(){
    console.log('ready');
    var search_button = document.getElementById('search_buttonPostCode');
    search_button.addEventListener('click', searchingGuardian);
    
};

