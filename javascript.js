/*
link to the API

*/

//--------------------Variables------------
var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?"

var apiKey = "c1bcc775e37c46ffa4f1a66092d6de7c"

var startDate; 

var endDate;

var searchTerm;

var numberRecords = 0;

function startDateConvert (startDate) {
	var myDate = startDate + "";
	myDate + "0101";
	return(myDate);
}

function endDateConvert (endDate) {
	var myDate = endDate + "";
	myDate + "1231";
	return(myDate);
}

function getQueryURL (startDate, endDate, searchTerm, url, apiKey) {
	var myURL = url;
	myURL = myURL + "api-key=" + apiKey + "&";
	if(searchTerm){
		myURL = myURL + "q=" + encodeURI(searchTerm);
		if(startDate){
			myURL + "&";
		}
	}
	if(startDate){
		myURL = myURL + "begin_date=" + startDate;
		if(endDate){
			myURL + "&";
		}
	}
	if(endDate){
		myURL = myURL + "end_date=" + endDate;
	}
	return(myURL);
}

function buildResultDiv(resultData, number){
	var result = $("<div>")
	result.addClass("result")
	var h2 = $("<h2>")
	var result_number = $("<span>")
	result_number.html(number).addClass("result-number")
	var headline = $("<span>")
	headline.html(resultData.headline.main)
	var author = $("<p>")
	author.html(resultData.byline.original)
	var section = $("<p>")
	section.html("book review")
	var date = $("<p>")
	date.html(resultData.pub_date)
	var webpage = $("<a>")
	webpage.html(resultData.web_url)
	h2.append(result_number);
	h2.append(headline);
	result.append(h2);
	result.append(author);
	result.append(section);
	result.append(date);
	result.append(webpage);

	return result;
}

$("#clearButton").on("click", function(){
	$("#lineId").html("");
})

$("#submitButton").on("click", function(event){
	event.preventDefault();
	startDate = $("#start-year").val(); 
	endDate	= $("#end-year").val();
	searchTerm = $("#search-term").val();
	numberRecords = $("#number-records option:selected").text();
	startDate = startDateConvert(startDate);
	endDate = endDateConvert(endDate);
	console.log(numberRecords)
	var myURL = getQueryURL(startDate, endDate, searchTerm, queryURL, apiKey)
	console.log(myURL)
	$.ajax({
		url: myURL,
		method: "GET"
	}).done(function(response){
		console.log(response);
		$("#lineId").html("");
		var my_response = response.response;
		var docs = my_response.docs;
		for(i = 0; i < numberRecords; i++){
			$("#lineId").append(buildResultDiv(docs[i], i+1));
		}
	});
})
