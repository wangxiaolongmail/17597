db.system.js.save({_id:"main",value:function (params) {
	var C=constant();
	var result;
	switch(params[C.STORED_METHOD]) 
	{   
		 case "admin_get_favorite":   
				result=admin_get_favorite(params);   
				break;
		 case "checkLogining":   
				result=checkLogining(params);   
				break;
		 case "logout":   
				result=logout(params);   
				break;
		 default:  
				result={ok:false,err:C.STORED_METHOD+" is undefined"};    
	}
	return result;
}})

