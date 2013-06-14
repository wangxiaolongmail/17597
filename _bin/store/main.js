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
		 case "admin_Start":   
				result=admin_Start(params);   
				break;
		 case "admin_constant_List":   
				result=admin_constant_List(params);   
				break;
		 case "admin_favorite_List":   
				result=admin_favorite_List(params);   
				break;
		 case "admin_favorite_type_List":   
				result=admin_favorite_type_List(params);   
				break;
		 case "checkLogining":   
				result=checkLogining(params);   
				break;
		 case "login":   
				result=login(params);   
				break;
		 case "logout":   
				result=logout(params);   
				break;    
		 case "init":   
				result=init(params);   
				break;  
		 default:  
				result={ok:false,err:C.STORED_METHOD+" is undefined"};    
	}
	result[C.INPUT]=params;
	_push_log(result);
	return result;
}})

