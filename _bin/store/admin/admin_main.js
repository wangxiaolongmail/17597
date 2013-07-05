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
		 case "admin_Save":   
				result=admin_Save(params);   
				break;
		 case "admin_Insert":   
				result=admin_Insert(params);   
				break;
		 case "admin_Remove":   
				result=admin_Remove(params);   
				break;  
		 case "admin_Logout":   
				result=admin_Logout(params);   
				break;   
		 case "admin_Update":   
				result=admin_Update(params);   
				break;  
		 default:  
				params[C.STORED_METHOD]="admin_Empty";
				result=admin_Empty(params);    
	}
	return result;
}})

