

		

function getPreference() {
	
	$('.refreshing_list').show();
	$.post('http://'+IP+':8089/appriz/getPreference',{},function(data){	
		if (data["status"]== 200){
			showPreference(data["preferences"]);
		}
		else{
			showInfoD($.t("Internet Connection"), $.t("Error getting entity preferences.") , function(){	preferenceChanges = {};	});
		}		
	},'json') .fail(function(e) {
		showInfoD($.t("Internet Connection"), $.t("Error getting entity preferences.") , function(){	preferenceChanges = {};	});
		console.log( JSON.stringify(e) );	    
	}).done(function(){$('.refreshing_list').hide(); });
		
}

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
} 

function showPreference(data){

    var html = '<div style="margin-top: 113px;">';
    var row = "";
	for (var e in data) { //each object at this level
		row += '<div idCategoria="'+data[e].id+'" class=categoria>';
		row += '<div class="categoriaPref" style="background-image:  url('+data[e].img+'); color: '+hexToRGB(data[e].fontColor)+' ">';
		row += '<div style="background-color: '+hexToRGB(data[e].backColor, 0.8)+' ">';
		row += '<i class="fa fa-circle-thin catIndicator"></i>';
		row += '<span style="background-color: '+hexToRGB(data[e].backColor)+' ">'+data[e].nombre+'</span>';
		row += '<h6 >'+$.t("More")+'</h6>';
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
	getPreferenceByUser();
}

function getPreferenceByUser() {
	
	$('.refreshing_list').show();
	$.post('http://'+IP+':8089/appriz/getPreferenceByUser',{"idSecretClient": idScretClient},function(data){	
		if (data["status"]== 200){
			showPreferenceByUser(data["preferences"]);
		}
		else{
			showInfoD($.t("Internet Connection"), $.t("Error getting user preferences.") , function(){	preferenceChanges = {};	});
		}					
	},'json') .fail(function(e) {
		showInfoD($.t("Internet Connection"), $.t("Error getting user preferences.") , function(){	preferenceChanges = {};	});
		console.log( JSON.stringify(e) );	    
	}).done(function(){$('.refreshing_list').hide(); });

}

function showPreferenceByUser(data){
 
	$.each(data, function(k, v) { 

		$('span:contains('+k+')').closest(".categoriaPref").addClass("active");
		$('span:contains('+k+')').prev().addClass("fa-check-circle").removeClass("fa-circle-thin");

		//if the value is an object, loop through each instance of the subcategories
		if(v instanceof Object) {
			$.each(v, function(key, val) {
				$('span:contains('+k+')').closest(".categoriaPref").next().children('div:contains('+key+')').addClass("active").css("color", "rgb(221, 160, 221)");
			});		
		}
	}); //each
}


function processPreferenceChange() {

	$('.refreshing_list').show();
	var tmp_preferenceChange;	
	tmp_preferenceChange = new Object();
	tmp_preferenceChange["information"]= new Object();
	tmp_preferenceChange["preferences"]= new Object();

	tmp_preferenceChange["idSecretClient"] = idScretClient;


	$(".categoria").each(function(){		
		var name = $(this).find("span").html();
		var hasOptionsSelected = false;
		var created = false;
		
	 	$(this).find(".preference").each(function(){			
			if( $(this).hasClass("active") ) {
				if(!created){
					tmp_preferenceChange["preferences"][name]= new Object();
					created = true;
				}
				tmp_preferenceChange["preferences"][name][$(this).html()]= true;
				hasOptionsSelected = true;				
			}
		});

		if( $(this).find(".categoriaPref ").hasClass("active") && !hasOptionsSelected) {			
			tmp_preferenceChange["preferences"][name]=true;			
		}		
		
	});	
	
	$('.refreshing_list').show();
	$.post('http://'+IP+':8089/appriz/sendCustomerInformation', tmp_preferenceChange,function(data){	
		if (data["status"]== 200){
			showInfoD($.t("Preferences"), $.t("Succesfully saved user preferences.") , function(){ preferenceChanges = {}; });
		}
		else{
			showInfoD($.t("Preferences"), $.t("Error sending user preferences.") , function(){	preferenceChanges = {};	});
		}
	},'json') .fail(function(e) {
		showInfoD($.t("Internet Connection"), $.t("Error sending user preferences.") , function(){	preferenceChanges = {};	});
		console.log( JSON.stringify(e) );	    
	}).done(function(){$('.refreshing_list').hide(); });		
}

// activa categoria
$( document ).on("tapend",".categoriaPref",function(){
	$(this).toggleClass("active");
	$(this).find('.fa').toggleClass("fa-check-circle").toggleClass("fa-circle-thin");
	preferenceChanges = {"er" : 1};	
});

// show subcategorias
$( document ).on("tapend",".categoriaPref h6",function(e){
	e.stopPropagation();

	var text = $(this).text();
	$(".selectSubCat.displayed").each(function(){
		$(this).removeClass("displayed");
		$(this).parent().find("h6").eq(0).text($.t('More'));
		$(this).parents(".categoriaPref").next(".selectSubCat").removeClass('displayed');
	});

	if( text == $.t('More') ){
		$(this).text($.t('Less'));		
		$(this).parents(".categoriaPref").next(".selectSubCat").addClass('displayed');
	}else{
		$(this).text($.t('More'));
	}
	
});

// activa subcategorias
$( document ).on("tapend",".preference",function(){
	$(this).toggleClass("active");
	var bkColor = $(this).parent().css("backgroundColor");
	$(this).css({"color" : $(this).hasClass("active") ? bkColor : "#FFF"});
	preferenceChanges = {"er" : 1};	

});

$( document ).on("tapend","#btnPrefs",function(){
	getPreference();
});
