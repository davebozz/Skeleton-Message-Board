function Data_One(b){
$.post(
		'php/tmp.php',
		{"Topic_ID":b},function(){
		document.location.href="tmp.html";	
		});

}
