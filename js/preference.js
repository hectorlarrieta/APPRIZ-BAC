ImgCache.options.debug = true;

// increase allocated space on Chrome to 50MB, default was 10MB
ImgCache.options.chromeQuota = 50*1024*1024;

$( document ).on("tapend",".categoriaPref",function(){
	$(this).toggleClass("active");
	$(this).find('.fa').toggleClass("fa-check-circle").toggleClass("fa-circle-thin");
});

$( document ).on("tapend",".categoriaPref h6",function(e){
	e.stopPropagation();
	$(".selectSubCat.displayed").removeClass("displayed");
	if($(this).text() == $.t('More') ){
		$(this).text($.t('Less')) ;
		
		$(this).parents(".categoriaPref").next(".selectSubCat").addClass('displayed');
	}else{
		$(this).text($.t('More')) ;
	}
	
})

 myScroll4 = new IScroll('#w1', { useTransition: true });
 myScroll4.refresh();