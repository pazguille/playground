$(function () {

	/*var socket = io.connect("http://192.168.41.51:6969")
	socket.on("server", server);
	var server = function (data) {
		if (localStorage.name) {
			$("#login label").text("Sos groso " + data);
			$("#login label").fadeOut().fadeIn();
		}
	};*/
	
	var prevent = function (event) {
		event.preventDefault();
		event.stopPropagation();
	};

	var errorMap = function () {
		$("#status").text("No te podemos localizar!");
	};
	
	var showMap = function (data) {
		var lat = data.coords.latitude;
		var lon = data.coords.longitude;
		
		$("#status").text("Estas en " + lat + ", " + lon);
		
		var coord = new google.maps.LatLng(lat, lon);
		
		var options = {
			center: coord, //donde voy a centrar el mapa
			zoom: 18, // zoom
			mapTypeId: google.maps.MapTypeId.HYBRID  //tipo de mapa
		};

		var map = new google.maps.Map(document.getElementById("map_canvas"), options);
		
		var opcionesChinche = {
			position: coord,
			map: map,
			title: "Estas aqui!"
		}
		
		var chinche = new google.maps.Marker(opcionesChinche);
		
		$("#map_canvas").height(300).width(500);
		
	};

	var geolocalization = function () {
		navigator.geolocation.getCurrentPosition(showMap, errorMap);
	};

	var addItem = function(event) {
		var pedacito = event.currentTarget.id;
		var rotacion = aleatorio(0,360);
		var tx = aleatorio(-64,64);
		var ty = aleatorio(-64,64);
		//alert(tx + "," + ty);
		var trocito = papel.image("src/assets/"+pedacito +".png", tx,ty,160,160);
		trocito.scale(0.2, 0.2);
		trocito.rotate(rotacion);
		parrillita.push(trocito);
		$("#parrilla ul").append("<li>"+pedacito + "</li>");
		delete trocito;
	};

	var aleatorio = function (to, from) {
	 	return Math.floor(Math.random() * (to -from + 1) + from);
	};

	var papel, parrillita;
	var draw = function () {
		papel = Raphael("canvas", 160, 160);
		parrillita = papel.set();
		parrillita.push(papel.image("src/assets/parrilla.png", 0, 0, 160, 160));
	};
	
	var transition = function () {

		if (localStorage.name) {
			//socket.emit("cliente", localStorage.name);
			
			$("#name").hide();
			$("#send").hide();
			$("#login label").text("Bienvenido " + localStorage.name + "!");
			
			$("#history").slideUp();
			
			$("#asador").show();

			//geolocalization();

			draw();			
			
		}
	};

	var saveLocal = function () {
		var data = $("#name").val();

		localStorage.name = data;

		transition();
	};
	
	$("#login").bind("submit", function(event) {
		prevent(event);

		if (navigator.onLine) {
			saveLocal();
		} else {
			saveLocal();
		}
	});
	
	//$("#ingredientes article").bind("click", this.id, addItem); // le mando el id por evento: event.data
	$("#ingredientes article").bind("click", addItem);
	
	transition();
});