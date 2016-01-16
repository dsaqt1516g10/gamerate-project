var API_BASE_URL = "http://localhost:8080/rate";

$(document).ready(function(){
	getCookie();	
});
function getCookie() {

	if($.cookie('username')) {
		console.log("logeado");
		var user_tag = $.cookie('username');
	    $('#login_info').html('<a style="color:#e52705" href="logout.html"><strong> Registrado </strong></a>');
        $('#create_result').html('<a href="login.html"><strong>  </strong></a>');

    }
	else
	{
		console.log("no logeado")
		$('#login_info').html('<a style="color:#16e7e2" href="login.html" ><strong> Iniciar sesión - Registrarse </strong></a>');
		$('#create_result').html('<a href="login.html"><strong> Debes iniciar sesión antes de crear helados </strong></a>');		
		
		/*document.getElementById('button_to_vote').style.visibility='hidden';*/
	}

}
/*--------------------------------------------REGISTRARSE-------------------------------------------*/
$("#registrarse").click(function(e) {
	e.preventDefault();
	if($("#log_user").val() == "" || $("#log_pass").val() == "" || $("#email_user").val() == "")
	{
		if($("#log_user").val() == "")
		{
			document.getElementById('log_user').style.background='#F6B5B5';
			$('#log_user').attr('placeholder','Usuario...');
		}
		if($("#log_pass").val() == "")
		{
			document.getElementById('log_pass').style.background='#F6B5B5';
			$('#log_pass').attr('placeholder','Contraseña...');
		}

	if($("#email_user").val() == "")
		{
			document.getElementById('email_user').style.background='#F6B5B5';
			$('#email_user').attr('placeholder','email...');
		}

	}
	else
	{
		var login = new Object();
		login.loginid = $("#log_user").val();
		login.password = $("#log_pass").val();
		login.email = $("#email_user").val();
		register(login);
	}
});
function register(login){
	console.log(login);
	var url = API_BASE_URL + '/users';
	var data = JSON.stringify(login);

	$.ajax({
		url : url,
		type : 'POST',
		crossDomain : true,
		contentType : 'application/vnd.dsa.rate.user+json',
		dataType : 'json',
		data : data
	}).done(function(data, status, jqxhr) {
        var inf = data;
		/*alert("¡Bienvenido "+inf.loginid +"! Ya puedes iniciar sesión");*/
		log(login);

  	}).fail(function() {
		alert("Error al registrarse: Nombre de usuario ya en uso");
	});
}

/*--------------------------------------------LOGIN-------------------------------------------*/
$("#login").click(function(e) {
	e.preventDefault();
	if($("#log_user").val() == "" || $("#log_pass").val() == "")
	{
		if($("#log_user").val() == "")
		{
			document.getElementById('log_user').style.background='#F6B5B5';
			$('#log_user').attr('placeholder','Usuario...');
		}
		if($("#log_pass").val() == "")
		{
			document.getElementById('log_pass').style.background='#F6B5B5';
			$('#log_pass').attr('placeholder','Contraseña...');
		}
	}
	else
	{
		var login = new Object();
		login.username = $("#log_user").val();
		login.password = $("#log_pass").val();
		log(login);
	}
});
function log(login){
	console.log(login);
	var url = API_BASE_URL + '/users/login';
	var data = JSON.stringify(login);

	$.ajax({
		url : url,
		type : 'POST',
		crossDomain : true,
		contentType : 'application/vnd.dsa.rate.user+json',
		dataType : 'json',
		data : data
	}).done(function(data, status, jqxhr) {

		var inf = data;

		if(inf.loginSuccesful!= true){
			alert("¡Usuario o contraseña incorrectos!");
		}
		else{

			var user_id_login = inf.usuarioid;
			var inputname = $('#log_user').val();
			var inputpass  = $('#log_pass').val();

			$.cookie('username', inputname, { expires: 1 });
			var currentusr = $.cookie('username');

			$.cookie('password', inputpass, { expires: 1 });
			var currentpss = $.cookie('pasword');

			$.cookie('user_id', user_id_login, { expires: 1 });
			var user_id_log = $.cookie('user_id');

			console.log(user_id_log);
			console.log(currentusr);
			console.log(currentpss);

			alert("¡Bienvenido "+inf.username+"!");
			window.location = "portada.html"

		}


	}).fail(function() {
		alert("Usuario y/o contraseña incorrectos");
	});
}

/*--------------------------------------------LOGOUT-------------------------------------------*/
$('#logout').on('click', function(e){
	e.preventDefault();
	if(($.removeCookie('username'))&&($.removeCookie('password'))&&($.removeCookie('user_id'))){
		alert("¡Hasta pronto!");		
		window.location = "portada.html"
	}
	else
	{
		alert("¡Antes debes iniciar sesión");
	}
});

/*--------------------------------------------GETS-------------------------------------------*/
$("#button_get").click(function(e) {
	e.preventDefault();
	getGame($("#juego_nombre").val());
});
function getGame(juego_nombre) {
	var url = API_BASE_URL + '/game/' + juego_nombre;
	$("#result").text('');

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {

				var game = data;

				$("#result").text('');
				$('<strong> Name: ' + game.name + '</strong><br>').appendTo($('#result'));
				$('<strong> ID: </strong> ' + game.id + '<br>').appendTo($('#result'));
				

			}).fail(function() {
				$('<div class="alert alert-danger"> Juego no encontrado </div>').appendTo($("#result"));
	});

}
$("#button_get2").click(function(e) {
	e.preventDefault();
	getGame2($("#juego_nombre").val());
});
function getGame2(juego_nombre) {
	var url = API_BASE_URL + '/game/' + juego_nombre;
	$("#result").text('');

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {

				var game = data;
				$('<div class="container">' +
'<div class="thumbnail">' +
'<div class="text-center">' +
'<div class="text-left"><button type="button" class="btn btn-info">Favoritos</button></div>' +
'<div class="text-right"<a href="#">Puntuación <span class="badge" id="nota"></span></a></div>' +
'<h1>+ game.name +</h1>' +
'<p></p>' +
'<div class="row">' +
'  <div class="col-sm-10" >' +
'<a href="img/portada3.jpg"><img src="img/portada3.jpg" class="img-rounded" alt="" width="600" height="600"></a></div>' +
'<div class="col-sm-1" >  ' +
'<div class="text-left">' +
'<div class="radio"> <label><input type="radio" name="optradio">0</label></div>' +
'<div class="radio"> <label><input type="radio" name="optradio">1</label></div>' +
'<div class="radio"> <label><input type="radio" name="optradio">2</label></div>' +
'<div class="radio"> <label><input type="radio" name="optradio">3</label></div>' +
'<div class="radio"> <label><input type="radio" name="optradio">4</label></div>' +
'<div class="radio"> <label><input type="radio" name="optradio">5</label></div>' +
'<div class="radio"> <label><input type="radio" name="optradio">6</label></div>' +
'<div class="radio"> <label><input type="radio" name="optradio">7</label></div>' +
'<div class="radio"> <label><input type="radio" name="optradio">8</label></div>' +
'<div class="radio"> <label><input type="radio" name="optradio">9</label></div>' +
'<div class="radio"> <label><input type="radio" name="optradio">10</label></div>' +
'</div>' +
'</div>' +
'<div class="row">  ' +
'  <div class="col-sm-10" >' +
'  <p class="text-center">Comentario sobre el juego. Puede escribir lo que sea, dependiendo de lo que se considere necesario.</p>' +
'  </div>' +
'  <div class="col-sm-2" >' +
'  <div class="text-left">' +
'<button type="button" class="btn btn-info">Puntua</button> ' +
'  </div>' +
'  </div>' +
'  </div>' +  
' <div class="page-header">' +
'    <p class="text-left"></p>     ' +
'  </div>' +
'  <div class="row">' +
'  <div class="col-sm-1" > </div>' +
'  <div class="col-sm-11" >' +
'  <div class="form-group">  ' +
'  <div class="row control-group">' +
'     <div class="form-group col-xs-12 floating-label-form-group controls">' +
'     <label>Mensaje</label>' +
'      <textarea rows="5" class="form-control" placeholder="Mensaje" id="mensaje" required data-validation-required-message="Introduce un mensaje."></textarea>' +
'      <p class="help-block text-danger"></p>' +
'     </div>' +
'    </div>' +
'   <br>' +
'     <div id="success"></div>' +
'     <div class="row">' +
'     <div class="form-group col-xs-12">' +
'     <button type="submit" class="btn btn-default">Enviar</button>' +
'     </div>' +
'     </div>' +  
'</div>' +
'</div>' +
'</div>' +
'<div class="row">' +
'  <div class="row">' +
'  <div class="col-sm-1" > </div>' +
'  <div class="col-sm-9" >' +
'  <span id="comentarios"></span>' +  
'  <h3 class="text-left">Comentarios:</h3>' +  
'</div>' +
'<div class="col-sm-2" > </div>' +
'</div>' +
'</div>' +
'</div>' +
'</div>' +
'</div>').appendTo($('#result'));
						

			}).fail(function() {
				$('<div class="alert alert-danger"> Juego no encontrado </div>').appendTo($("#result"));
	});

}
$("#button_get_rev").click(function(e) {
	e.preventDefault();
	getRev($("#juego_nombre").val());
});
function getRev(juego_nombre) {
	var url = API_BASE_URL + '/rev/' + juego_nombre;
	$("#result").text('');

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {

				var game = data;

				$("#result").text('<br>');
				$('<strong> ID: ' + game.id + '</strong><br>').appendTo($('#result'));
				$('<strong> Userid: </strong> ' + game.userid + '<br>').appendTo($('#result'));
				$('<strong> Gameid: </strong> ' + game.gameid + '<br>').appendTo($('#result'));
				$('<strong> Content: </strong> ' + game.content + '<br>').appendTo($('#result'));

			}).fail(function() {
				$('<div class="alert alert-danger"> Comentario no encontrado </div>').appendTo($("#result"));
	});

}
$("#button_get_score").click(function(e) {
	e.preventDefault();
	getScore($("#juego_nombre").val());
});
function getScore(juego_nombre) {
	var url = API_BASE_URL + '/game/' + juego_nombre;
	$("#result").text('');

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {

				var game = data;

				$("#result").text('<br>');				
				$('<strong> Name: </strong> ' + game.name + '<br>').appendTo($('#result'));
				$('<strong> Gameid: </strong> ' + game.id + '<br>').appendTo($('#result'));
				$('<strong> Score: </strong> ' + game.score + '<br>').appendTo($('#result'));

			}).fail(function() {
				$('<div class="alert alert-danger"> No tiene puntuación </div>').appendTo($("#result"));
	});

}
$("#button_gets").click(function(e) {
	e.preventDefault();
	var url = API_BASE_URL + '/game/games?per_page=5';
	getGames(url);
});
function getGames(url) {	
	$("#result").text('');	

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
        	var response = data;
		var gameCollection = new GameCollection(response);
                var linkHeader = jqxhr.getResponseHeader('Link');
                gameCollection.buildLinks(linkHeader);

		var html = gameCollection.toHTML();
		$("#result").html(html);

	}).fail(function(jqXHR, textStatus) {
		console.log(textStatus);
	});

}
function GameCollection(gameCollection){
	this.game = gameCollection;
	var instance = this;

	this.buildLinks = function(header){
		if (header != null ) {
			this.links = weblinking.parseHeader(header);
		} else {
			this.links = weblinking.parseHeader('');
		}
	}

	this.getLink = function(rel){
                return this.links.getLinkValuesByRel(rel);
	}

	this.toHTML = function(){
		var html = '';
		$.each(this.games, function(i, v) {
			var game = v;			
			html = html.concat('<strong> Name: ' + game.name + '</strong><br>'+
			'<strong> ID: </strong> ' + game.id + '<br>');
			
		});
		
		html = html.concat(' <br> ');

                var prev = this.getLink('prev');
		if (prev.length == 1) {
			html = html.concat(' <a onClick="getRepos(\'' + prev[0].href + '\');" style="cursor: pointer; cursor: hand;">[Prev]</a> ');
		}
                var next = this.getLink('next');
		if (next.length == 1) {
			html = html.concat(' <a onClick="getRepos(\'' + next[0].href + '\');" style="cursor: pointer; cursor: hand;">[Next]</a> ');
		}

 		return html;	
	}

}


$("#button_favoritos").click(function(e) {
	e.preventDefault();
	getMisJuegos();
});
function getMisJuegos() {

	var USERNAME = $.cookie('username');
	var PASSWORD = $.cookie('password');

	$.ajaxSetup({
		headers: { 'Authorization': "Basic "+ btoa(USERNAME+':'+PASSWORD) }
	});

	var url = API_BASE_URL + '/likes/' +USERNAME;

	$("#mis_juegos").text('');
	
	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json'
	}).done(function(data, status, jqxhr) {

				var likes = data;                                    
                              
                    $('<div class="col-lg-3 col-md-6">' +
					'<div class="panel panel-primary"> ' +
					'<div class="panel-heading">' +
                            '<div class="row">' +
                                '<div class="col-xs-3">' +
                                   '<img class="img-rounded" src="img/guillermo.jpg" width="200" height="200"> ' +
                                '</div>' +
                                '<div class="col-xs-9 text-right">' +
                                   ' <div class="huge">'+ likes.reviewid + '</div> ' +                                   
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<a href="juegos.html">' +
                            '<div class="panel-footer">' +
                                '<span class="pull-left">Ver</span>' +
                                '<span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>' +
                                '<div class="clearfix"></div>' +
                            '</div>' +
                        '</a>' +
                    '</div>' +
                '</div>   ').appendTo($('#mis_juegos'));
				

	}).fail(function() {
		$("#mis_juegos").text("¡No tienes favoritos!");
	});

}
$("#button_get_por_categorias").click(function(e) {
	e.preventDefault();

    var categoria = $("#categoria").val();

	getJuegos_categorias(categoria);
});
function getJuegos_categorias(categoria) {
    
	var url = API_BASE_URL + '/game/categorias/' +categoria;
	$("#mis_juegos").text('');
	
	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json'
	}).done(function(data, status, jqxhr) {

				var likes = data;                                    
                              
                    $('<div class="col-lg-3 col-md-6">' +
					'<div class="panel panel-primary"> ' +
					'<div class="panel-heading">' +
                            '<div class="row">' +
                                '<div class="col-xs-3">' +
                                   '<img class="img-rounded" src="img/guillermo.jpg" width="200" height="200"> ' +
                                '</div>' +
                                '<div class="col-xs-9 text-right">' +
                                   ' <div class="huge">'+ game.categoria + '</div> ' +                                   
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<a href="juegos.html">' +
                            '<div class="panel-footer">' +
                                '<span class="pull-left">Ver</span>' +
                                '<span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>' +
                                '<div class="clearfix"></div>' +
                            '</div>' +
                        '</a>' +
                    '</div>' +
                '</div>   ').appendTo($('#mis_juegos'));
				

	}).fail(function() {
		$("#mis_juegos").text("¡No tienes favoritos!");
	});

}
$("#button_get_pagination").click(function(e) {
	e.preventDefault();
	var url = API_BASE_URL + '/game/games?per_page=5';
	getGamesPagination(url);
});
function getGamesPagination(url) {	
	$("#result").text('');	

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
        	var response = data;
		var gameCollection = new GameCollection(response);
                var linkHeader = jqxhr.getResponseHeader('Link');
                gameCollection.buildLinks(linkHeader);

		var html = gameCollection.toHTML();
		$("#result").html(html);

	}).fail(function(jqXHR, textStatus) {
		console.log(textStatus);
	});

}
function GameCollection(gameCollection){
	this.games = gameCollection;

	var instance = this;

	this.buildLinks = function(header){
		if (header != null ) {
			this.links = weblinking.parseHeader(header);
		} else {
			this.links = weblinking.parseHeader('');
		}
	}

	this.getLink = function(rel){
                return this.links.getLinkValuesByRel(rel);
	}

	this.toHTML = function(){
		var html = '';
		$.each(this.games, function(i, v) {
			var game = v;			
			html = html.concat('<br><strong> Name: ' + game.name + '</strong><br>'+
			'<strong> ID: </strong> ' + game.id + '<br>');
			
		});
		
		html = html.concat(' <br> ');

                var prev = this.getLink('prev');
		if (prev.length == 1) {
			html = html.concat(' <a onClick="getGamesPagination(\'' + prev[0].href + '\');" style="cursor: pointer; cursor: hand;">[Prev]</a> ');
		}
                var next = this.getLink('next');
		if (next.length == 1) {
			html = html.concat(' <a onClick="getGamesPagination(\'' + next[0].href + '\');" style="cursor: pointer; cursor: hand;">[Next]</a> ');
		}

 		return html;	
	}

}

/*--------------------------------------------POST-------------------------------------------*/
$("#button_crear_comentario").click(function(e) {
	e.preventDefault();
	var USERNAME = $.cookie('username');
	var PASSWORD = $.cookie('password');
	$.ajaxSetup({
		headers: { 'Authorization': "Basic "+ btoa(USERNAME+':'+PASSWORD) }
	});
    var newComent = new Object();    
    newComent.game = $("#nombre_juego").val();   
    newComent.usuario = user_id; 
    newComent.comentario = $("#comentario").val();        
	createComent(newComent);     
});
function createComent(newComent) {
    
	var url = API_BASE_URL + '/game';
	var data = JSON.stringify(newComent);

	$("#create_result").text('');
	console.log(newComent.comentario);
	if( newIce.comentario == "" || newIce.comentario == " " || newIce.comentario == "  "|| newIce.comentario == "   "){
		console.log("Nombre vacío");
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Introduce algo en los comentarios </div>').appendTo($("#create_result"));
	}
	else
	{
		$.ajax({
			url : url,
			type : 'POST',
			crossDomain : true,
			dataType : 'json',
			data : data,
			contentType : 'application/vnd.gamerate.api.game+json'
		}).done(function(data, status, jqxhr) {
			$("#create_result").empty("#create_result");
			$('<div class="alert alert-success"> <strong>¡Hecho!</strong></div>').appendTo($("#create_result"));
			window.location.reload();
		}).fail(function() {
			$("#create_result").empty("#create_result");
			$('<div class="alert alert-danger"> <strong>Oh!</strong> Error</div>').appendTo($("#create_result"));
		});
	}
}
$("#button_crear_juego").click(function(e) {
	e.preventDefault();
	var USERNAME = $.cookie('username');
	var PASSWORD = $.cookie('password');
	$.ajaxSetup({
		headers: { 'Authorization': "Basic "+ btoa(USERNAME+':'+PASSWORD) }
	});
    var newJuego = new Object();    
	newJuego.name = $("#nombre_juego").val(); 
	newJuego.genre = $("#genero").val(); 
    newJuego.usuario = user_id; 
    newJuego.year = $("#año").val();        
	createGame(newJuego);     
});
function createGame(newJuego) {
    
	var url = API_BASE_URL + '/game';
	var data = JSON.stringify(newJuego);

	$("#create_game").text('');
	console.log(newJuego.name);
	if( newJuego.name == "" || newJuego.name == " " || newJuego.name == "  "|| newJuego.name == "   "
	|| newJuego.genre == "" || newJuego.genre == " " || newJuego.genre == "  "|| newJuego.genre == "   "
	|| newJuego.year == "" || newJuego.year == " " || newJuego.year == "  "|| newJuego.year == "   "){
		console.log("Nombre vacío");
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Introduce bien los valores del jeugo </div>').appendTo($("#create_game"));
	}
	else
	{
		$.ajax({
			url : url,
			type : 'POST',
			crossDomain : true,
			dataType : 'json',
			data : data,
			contentType : 'application/vnd.gamerate.api.game+json'
		}).done(function(data, status, jqxhr) {
			$("#create_game").empty("#create_game");
			$('<div class="alert alert-success"> <strong>¡Hecho!</strong></div>').appendTo($("#create_game"));
			window.location.reload();
		}).fail(function() {
			$("#create_game").empty("#create_game");
			$('<div class="alert alert-danger"> <strong>Oh!</strong> Error</div>').appendTo($("#create_game"));
		});
	}
}


/*--------------------------------------------DELETE-------------------------------------------*/
$("#button_eliminar_comentario").click(function(e) {
	e.preventDefault();	
	eliminarcomentario($("#comentario_a_eliminar").val());
});
function eliminarcomentario(comentario_a_eliminar) {

	var USERNAME = $.cookie('username');
	var PASSWORD = $.cookie('password');

	$.ajaxSetup({
		headers: { 'Authorization': "Basic "+ btoa(USERNAME+':'+PASSWORD) }
	});

	var url = API_BASE_URL + '/game/' + comentario_a_eliminar;
	
	$("#comentarios_result").text('');

	$.ajax({
		url : url,
		type : 'DELETE',
		crossDomain : true,
		dataType : 'json'
                
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Comentario eliminado</div>').appendTo($("#comentarios_result"));
		window.location.reload();
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> No hay comentarios con esta ID! </div>').appendTo($("#comentarios_result"));
	});

}
$("#button_eliminar_favoritos").click(function(e) {
	e.preventDefault();	
	eliminarfavoritos($("#favoritos_a_eliminar").val());
});
function eliminarfavoritos(favoritos_a_eliminar) {

	var USERNAME = $.cookie('username');
	var PASSWORD = $.cookie('password');

	$.ajaxSetup({
		headers: { 'Authorization': "Basic "+ btoa(USERNAME+':'+PASSWORD) }
	});

	var url = API_BASE_URL + '/game/' + favoritos_a_eliminar;
	
	$("#mis_juegos").text('');

	$.ajax({
		url : url,
		type : 'DELETE',
		crossDomain : true,
		dataType : 'json'
                
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Se ha eliminado el juego de favoritos</div>').appendTo($("#mis_juegos"));
		window.location.reload();
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> No tienes un favorito con esta ID! </div>').appendTo($("#mis_juegos"));
	});

}
$("#button_eliminar_juego").click(function(e) {
	e.preventDefault();	
	eliminarjuego($("#juego_a_eliminar").val());
});
function eliminarjuego(juego_a_eliminar) {

	var USERNAME = $.cookie('username');
	var PASSWORD = $.cookie('password');

	$.ajaxSetup({
		headers: { 'Authorization': "Basic "+ btoa(USERNAME+':'+PASSWORD) }
	});

	var url = API_BASE_URL + '/game/' + juego_a_eliminar;
	
	$("#juegos_result").text('');

	$.ajax({
		url : url,
		type : 'DELETE',
		crossDomain : true,
		dataType : 'json'
                
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Juego eliminado</div>').appendTo($("#juegos_result"));
		window.location.reload();
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> No hay juegos con esta ID! </div>').appendTo($("#juegos_result"));
	});

}
$("#button_eliminar_categoria").click(function(e) {
	e.preventDefault();	
	eliminarcategoria($("#categoria_a_eliminar").val());
});
function eliminarcategoria(categoria_a_eliminar) {

	var USERNAME = $.cookie('username');
	var PASSWORD = $.cookie('password');

	$.ajaxSetup({
		headers: { 'Authorization': "Basic "+ btoa(USERNAME+':'+PASSWORD) }
	});

	var url = API_BASE_URL + '/game/' + categoria_a_eliminar;
	
	$("#juegos_result").text('');

	$.ajax({
		url : url,
		type : 'DELETE',
		crossDomain : true,
		dataType : 'json'
                
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Categoria eliminada</div>').appendTo($("#juegos_result"));
		window.location.reload();
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> No hay categoria con esta ID! </div>').appendTo($("#juegos_result"));
	});

}
