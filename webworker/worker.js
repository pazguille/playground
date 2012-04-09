	function get(url) {
	 	//try {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", url, true);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.send();
			return {
				status: xhr.status,
				readyState: xhr.readyState,
				onreadystatechange: xhr.onreadystatechange,
				responseText: xhr.responseText,
				responseXML: xhr.responseXML
			};
		//} catch (e) {
		//return ''; // turn all errors into empty results}
	};

var parseResults = function(data){

	var items = [];
	for (var i = 0, j = data[2].results.length; i < j; i += 1) {
		var title = "<header><a href=\"" + data[2].results[i].permalink + "\">" + data[2].results[i].title + "</a></header>";
		var thumb = "<figure><a href=\"" + data[2].results[i].permalink + "\"><img src=\"" + data[2].results[i].thumbnail + "\" width=\"90\" height=\"90\"></a></figure>";
		var price = "<p class=\"costs\"><span class=\"price\">" + ((data[2].results[i].currency_id == "USD") ? "U$S " : "$ ") + data[2].results[i].price + "</span></p>";				
		var row = "<li><article>" + title + thumb + price + "</article></li>";
		items.push(row);
	};
	var html = items.join("") + "<p class=\"actions\"><input type=\"submit\" value=\"More\" class=\"btn secondary skin more\"><p>";
	
	postMessage(html);
};

// Get the incoming information from the parent
onmessage = function(event) {
    //for (var i = event.data, j=10; i<j; i++) {
       // Envía datos continuamente
	if (event.data === "update"){
		setInterval(function(){
			importScripts("https://api.mercadolibre.com/sites/MLA/search?q=ipod&callback=parseResults");
			//get("https://api.mercadolibre.com/sites/MLA/search?q=ipod&callback=postMessage");
		}, 1000);	
	}
	//postMessage(get("https://api.mercadolibre.com/sites/MLA/search?q=ipod"));
    //};
};
