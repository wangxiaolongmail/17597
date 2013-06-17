db.system.js.save({_id:"admin_main",value:function (params) {
	var C=constant();
	var result;
	switch(params[C.STORED_METHOD]) 
	{   
		 case "admin_Start":   
				result=admin_Start(params);   
				break;
		 case "admin_List":   
				result=admin_List(params);   
				break;
		 case "logining":   
				result=logining(params);   
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
	return result;
}})

