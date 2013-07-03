db.system.js.save({_id:"main",value:function (params) {
	var C=constant();
	var result;
	params[C.ROLE_NAME]=params[C.ROLE_NAME]||C.PUBLIC;
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
		 case "Register":   
				result=Register(params);   
				break; 
		 case "RegisterSubmit":   
				result=RegisterSubmit(params);   
				break;
		 case "logining":   
				result=logining(params);   
				break;
		 case "Login2":   
				result=Login2(params);   
				break;
		 case "Logining2":   
				result=Logining2(params);   
				break;
		 case "login":   
				result=login(params);   
				break;
		 default:
				delete params[C.ROLE_NAME];
				result=admin_main(params);    
	}
	_mixin(result,params);
	_push_log(result);
	return result;
}})

