
	var tabSelectedColor 	= "rgb(0, 91, 153)";
	var tabUnSelectedColor 	= "rgb(213, 212, 211)";
	
	//Main Menu handle
	

	// document.addEventListener("deviceready", function() {
		$(".menu-main , .icon-menu").tapend(function(e){
			
			//e.stopPropagation();
			$('.allMenu').css({"width" : "80%" });
			$('#menuAppriz').fadeIn({"display" : "block"});
			$('.allMenu').velocity({"right" : "0px" },{ duration: 500 });
		});
		
		$('.bgModal').tapend(function(e){
			$('#menuAppriz').fadeOut(300);
			$('.allMenu').animate({"right" : "-80%"});
			
		});
		

		
		

		$.fn.hasAttr = function(name) {  
			return this.attr(name) !== undefined;
		};
				//Menu Nav
		$( document ).on("tapend",'.navAppriz li',function(){
			if(	$(this).find("a").hasAttr("menu-page")){
				$($(".navAppriz .active").find("a").attr("menu-page")).hide();
				$(".navAppriz .active").removeClass("active");
				$(this).addClass("active");
				$($(this).find("a").attr("menu-page")).show();
			
			}
		});
	//});
	
	
	//Page Changer
	$( document ).on("tapend","[page-content]",function(ev){
		var noTouch = false;
		try{
			 endY = ev.pageY || ev.originalEvent.changedTouches[0].pageY;
		}catch(e){noTouch = true;}
		console.log(noTouch);
		if(noTouch || Math.abs(startTap.Y - endY) < 10){
			$('#pin').hide();
			$("#deleteAllBtn").hide();
			$(".deleteOptionActivate").removeClass("deleteOptionActivate");
			$(".moveContainer").css({"margin-left" : "0px"});
			if(back.length == 1 && back[0] == "Login"){}else{
			back.push( $(".page-content.active").attr("id"));}
			$(".page-content.active").removeClass("active");
			$("header.active").removeClass("active");
			$("#"+$(this).attr("page-content")+".page-content").addClass("active").show();
			$("#"+$("#"+$(this).attr("page-content")+".page-content").attr("header")).addClass("active").show();
			$("#"+$("#"+$(this).attr("page-content")+".page-content").attr("header")).find('.headerText').html($.t($("#"+$(this).attr("page-content")+".page-content").attr("headerText")));
			$('#menuAppriz').fadeOut(300);
				$('.allMenu').velocity({"right" : "-80%"});
								if( $(this).attr("page-content") == "settingsPage" ){
					
			$('header .icon-back').css("color", "white" )
			$('header .icon-menu').css("color", "white" )
			$('header .icon-menu').css("color", "white" )
					if(pinPolicy==1 ){
					
					$('#pin').show();
					
				}
				} 
		}
			
	});
	//page backt
	
		$( document ).on("tapend",".newUserlink", function(){
			$('header .icon-back').css("color", "#FFFFFF" );
			$('header .icon-menu').css("color", "#FFFFFF" );
			
		});
		
		
	
	$( document ).on("tapend","a.icon-back", function(){
				
			$('header .icon-back').css("color", "#FFFFFF" );
			$('header .icon-menu').css("color", "#FFFFFF" );
		
		if(!$.isEmptyObject(rulesChanges)){
			showAlert($.t("Rule Changed"), $.t("Do you want to save changes?") , function(){
				processRuleChange();
			},function(){
				rulesChanges = {};
			});
			
		}else {
			if(!$.isEmptyObject(preferenceChanges)){
				showAlert($.t("Preference Changed"), $.t("Do you want to save changes?") , function(){					
					processPreferenceChange();
				},function(){
					preferenceChanges = {};
				});				
			}
		}
			
		console.log(JSON.stringify(back));
		var inBack = back.pop();
		$('#pin').hide();
		if(inBack == "undefined" ){	
			navigator.app.exitApp();
		}
		
		if(scrollPosition!=0){
		//myScroll3.scrollTo(0,scrollPosition);
				}
				
		if(inBack == "settingsPage" ){	
			$('header .icon-back').css("color", "#FFFFFF" );
			$('header .icon-menu').css("color", "#FFFFFF" );
		}
		
		if(inBack != "Login" ){
			$(".page-content.active").removeClass("active");
			$("header.active").removeClass("active");
			$("#"+inBack).addClass("active").show();
			$("#"+$("#"+inBack).attr("header")).addClass("active").show();
		}else if(inBack == "Login"){
			$("#login").show();
			$("#appHolder").hide();
			$(".page-content.active").removeClass("active");
			$("header.active").removeClass("active");
			$("#headerMain").addClass("active").show();
			$("#inbox").addClass("active").show();
			
		}else{
			try{navigator.splashscreen.show();}catch(e){}
			window.location.reload(true);
		}
			
	});
	
//Special elements:

$( document ).on("tapend",'.imglogo',function(e){
	$('header .icon-back').css("color", "#FFFFFF" );
    $('header .icon-menu').css("color", "#FFFFFF" );
});

$( document ).on("click",'input + label',function(e){
    e.preventDefault();
});

$( document ).on("tapend",'input[type=checkbox] + label',function(e){
	$(this).prev().prop("checked", !$(this).prev().prop("checked"));
	
});

$( document ).on("tapend",'.weeksOption li',function(e){
	$(this).find('input').prop("checked", true);
	
});

androidBackBtn = 0;
//Buttons
function backKeyDown() { 
		
		
		$('header .icon-back').css("color", "#FFFFFF" );
		$('header .icon-menu').css("color", "#FFFFFF" );
		
		if($('.page-content.active').attr('id') == "inbox"){
			navigator.app.exitApp();
		}else{
		androidBackBtn++;
		if(!$.isEmptyObject(rulesChanges)){
				showAlert($.t("Rule Changed"), $.t("Do you want to save changes?") , function(){
					processRuleChange();
				},function(){
					rulesChanges = {};
				});
				
			}
			console.log(JSON.stringify(back));
		var inBack = back.pop();
		$('#pin').hide();
		
		if(inBack == "undefined" ){	
			navigator.app.exitApp();
		}
		if(inBack != "Login" ){
			$(".page-content.active").removeClass("active");
			$("header.active").removeClass("active");
			$("#"+inBack).addClass("active").show();
			$("#"+$("#"+inBack).attr("header")).addClass("active").show();
		}else if(inBack == "Login"){
			$("#login").show();
			$("#appHolder").hide();
			$(".page-content.active").removeClass("active");
			$("header.active").removeClass("active");
			$("#headerMain").addClass("active").show();
			$("#inbox").addClass("active").show();
			
		}else{
			try{navigator.splashscreen.show();}catch(e){}
			window.location.reload(true);
		}
	}
}

function menuKeyDown(){
	$(".menu-main").trigger("tapend");
}

function onResume(){
counterByMsg();
reportMsgState();
}

function onPause(){
		if(currentEntityID > 0){
		try{
			pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, $('.unread').length);
		}catch(e){
		}
	}
	

}



//Star in Tap
startTap = { X : 0 , Y : 0}
$("*").tapstart(function(ev){
	startTap.X = ev.pageX || ev.originalEvent.touches[0].pageX;
	startTap.Y = ev.pageY || ev.originalEvent.touches[0].pageY;
});

$.fn.textWidth = function(text, font) {
    if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
    $.fn.textWidth.fakeEl.text(text || this.val() || this.text()).css('font', font || this.css('font'));
    return $.fn.textWidth.fakeEl.width();
};



//Load Translated

$.i18n.init({ lng: navigator.language , resGetPath: 'language/__lng__/__ns__.json',fallbackLng: 'en'},function(){
	
	$("[i18Trans]").each(function(){
		if( $(this).hasAttr("i18Target")){
			$(this).attr($(this).attr("i18Target"),$.t($(this).attr("i18Trans")));
		}else{
			$(this).html($.t($(this).attr("i18Trans")));
		}
	});
//	alert( $.t("app.name")) ;

});




	

	
	

