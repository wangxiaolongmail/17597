db.system.js.save({_id:"main",value:function (params) {
	var C=constant();
	var result;
	switch(params[C.STORED_METHOD]) 
	{   
		 case "goto":   
				result=goto(params);   
				break; 
		 case "get_check_code":   
				result=get_check_code(params);   
				break;  
		 case C.SHOW_FAVORITE:   
				result=show_favorite(params);   
				break;
		 default:  
				result=admin_main(params);    
	}
	_mixin(result,params);
	_push_log(result);
	return result;
}})

