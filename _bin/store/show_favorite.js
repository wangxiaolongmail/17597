db.system.js.save({_id:"show_favorite",value:function(params){
		var C=constant();
		params[C.TABLE_NAME]="favorite";
		var result=_get_view1(params);
		result.ok=true;
		result[C.URL_NAME]=C.EASYSOFT+C.INDEX;
		return result;
	}
})


