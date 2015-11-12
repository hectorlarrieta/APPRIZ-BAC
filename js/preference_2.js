

function connectionAjax(url, dataObject, succesfulCallBack, typo){
	$.ajax ({
		url: url,
		dataType: "json",
		type: typo,
		contentType: 'application/json',
		data: JSON.stringify(dataObject),		
		success: succesfulCallBack,
		error : function (data){
			alert("Errorrrr en ajax: "+console.dir(data));
            
        }
		
	}).fail(function(data) {
		console.log( data.responseText );
	});
}
		
function resetInformation() {
	var url = 'http://10.60.0.142:9088/services/resetInformation';
	var type = 'POST';
	var data = {};
	connectionAjax(url, data, function(data){alert("Reset con éxito");}, type );
}


/*
* funcion getPreference() obtiene  el objeto de preferencias de la entidad
*/
function getPreference() {
	
	var url = 'http://10.60.0.142:9088/services/getPreference';
	var type = 'GET';
	var data = {};
	connectionAjax(url, data, showPreference, type );
}


/*
* funcion create(k, v, n) es recursiva, manejada por la fns showPreference y showPreferenceByUser
*/
function create(k, v, n) { 
	//print cat
	var row = "";
	row += '<div class="preference">'+k;	

	//if the value is an object, loop through each instance of the subcategories
	if(v instanceof Object) {
		$.each(v, function(key, val, n) {
			row += create(key, val, n+1)
		});		
	}
	row += '</div>';
	return row;
}


/*
* funcion hexToRGB() pasa un color en formato hexadecimal a formato RGB 
*/
function hexToRGB(str,alpha){
	
    var re = /^#([A-Fa-f0-9]{2})([A-Fa-f0-9]{2})([A-Fa-f0-9]{2})/;
    m = re.exec(str);
    
    var R = parseInt(m[1],16);
    var G = parseInt(m[2],16);
    var B = parseInt(m[3],16);
    
    if(alpha == undefined){
	 return "rgb("+R+","+G+","+B+")";
    }else{
        return "rgba("+R+","+G+","+B+","+alpha+")";
    }
    
    //return "rgba("+134+","+0+","+179+","+0.8+")";    
} 


/*
* showPreference() llena el listView de preferencias
*/
function showPreference(data){

    var html = '<div style="margin-top: 113px;">';
    var row = "";
	for (var e in data) { //each object at this level
		row += '<div idCategoria="'+data[e].id+'" class=categoria>';
		row += '<div class="categoriaPref" style="background-image:  url('+data[e].img+'); color: '+hexToRGB(data[e].fontColor)+' ">';
		row += '<div style="background-color: '+hexToRGB(data[e].backColor, 0.8)+' ">';
		row += '<i class="fa fa-circle-thin catIndicator"></i>';
		row += '<span style="background-color: '+hexToRGB(data[e].backColor)+' ">'+data[e].nombre+'</span>';
		row += '<h6 i18Trans="More"></h6>';
		row += '</div></div>';		

		row += '<div class="selectSubCat" style="background-color:'+hexToRGB(data[e].backColor)+' ">';
		//subs	
		$.each(data[e].subs, function(k, v) { 
			row +=create(k, v, 0) 
		});	
		row += '</div>';
		row += '</div>'; 
		
	}	
	html += row + "</div>";
	$("#preferences").html(html);
}


/**
* funcion getPreferenceByUser() obtiene la lista de preferencias de un usuario
*/
function getPreferenceByUser() {
	var id_html = $('#id-costumer-GetPreferenceByUser');
	alert("id recibido: "+id_html.val());

	var id = {
		"id": ""+id_html.val()
	};
	
	var url = 'http://10.60.0.142:9088/services/getPreferenceByUser';
	var type = 'POST';
	var data = id;
	connectionAjax(url, data, showPreferenceByUser, type );
}


/**
* funcion showPreferenceByUser() pinta la lista de preferencias
*/
function showPreferenceByUser(data){
    var html = "<table>";
    var row = "";
			
	row += "<tr><td> ";

	$.each(data, function(k, v) { 
		row +=create(k, v, 0) 
	});
	
	row += "</td></tr>";
	
	html += row + "</table>";
	$("#results").html(html);
}

$( document ).on("tapend","#btnPrefs",function(){

	console.log('loading Preferences...');
	getPreference();

});

