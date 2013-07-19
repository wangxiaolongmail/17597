db.system.js.save({_id:"show_favorite",value:function(params){
		var C=constant();
		var input={};
		input[C.TABLE_NAME]="favorite";
		input[C.TABLE+C.TYPE]="favorite_type";
		var a=_get_view1(input);
		var result={
		  ok:true
		};
		result[C.VIEW]=a;
		result[C.URL_NAME]=C.EASYSOFT+C.INDEX;
		return result;
	}
})


