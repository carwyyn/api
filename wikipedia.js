// Wikipedia search for key terms from guardian title

var baseURL = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=";

//Stack%20Overflow
var searchWord = "India";

var sendWiki = baseURL + searchWord;


var processResponse = function(){
    
    //make the data we get back easy to understand
    
    var data = JSON.parse(this.response);
    console.log(data);
    var body = document.getElementsByTagName('body')[0];
    


}

xhttp = new XMLHttpRequest();
xhttp.addEventListener('load', processResponse);

xhttp.open('GET', sendWiki);
xhttp.setRequestHeader( 'Api-User-Agent', 'cazza822@gmail.com' );

xhttp.send();

