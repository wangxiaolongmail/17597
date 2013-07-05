db.system.js.save({_id:"create_authority",value:function (params) {
	var C=constant();
	db[C.AUTHORITY].remove();
	
	var rolename=C.EASYSOFT;
		var obj={};
		obj[C.URL_NAME]=C.EASYSOFT+C.ADMIN+C.FAVORITE_TYPE+C.LIST;
		obj[C.ROLE_NAME]=rolename;
		obj[C.IS_NEW]=true;
		obj[C.IS_EDIT]=true;
		obj[C.IS_DELETE]=true;
		obj[C.IS_MENU]=true;
		_insert(C.AUTHORITY,obj);
	
		var obj={};
		obj[C.URL_NAME]=C.EASYSOFT+C.ADMIN+C.FAVORITE_TYPE+C.ADD;
		obj[C.ROLE_NAME]=rolename;
		obj[C.IS_NEW]=true;
		obj[C.IS_EDIT]=true;
		obj[C.IS_DELETE]=true;
		obj[C.IS_MENU]=false;
		_insert(C.AUTHORITY,obj);
		
		var obj={};
		obj[C.URL_NAME]=C.EASYSOFT+C.ADMIN+C.FAVORITE_TYPE+C.SAVE;
		obj[C.ROLE_NAME]=rolename;
		_insert(C.AUTHORITY,obj);	
		
		var obj={};
		obj[C.URL_NAME]=C.EASYSOFT+C.ADMIN+C.FAVORITE_TYPE+C.INSERT;
		obj[C.ROLE_NAME]=rolename;
		_insert(C.AUTHORITY,obj);
	
	var rolename=C.REGISTER;
		var obj={};
		obj[C.URL_NAME]=C.EASYSOFT+C.ADMIN+C.START;;
		obj[C.ROLE_NAME]=rolename;
		obj[C.IS_MENU]=true;
		_insert(C.AUTHORITY,obj);
	
		var obj={};
		obj[C.URL_NAME]=C.EASYSOFT+C.ADMIN+C.FAVORITE+C.LIST;
		obj[C.ROLE_NAME]=rolename;
		obj[C.IS_NEW]=true;
		obj[C.IS_EDIT]=true;
		obj[C.IS_DELETE]=true;
		obj[C.IS_MENU]=true;
		_insert(C.AUTHORITY,obj);
	
		var obj={};
		obj[C.URL_NAME]=C.EASYSOFT+C.ADMIN+C.FAVORITE+C.ADD;
		obj[C.ROLE_NAME]=rolename;
		obj[C.IS_NEW]=true;
		obj[C.IS_EDIT]=true;
		obj[C.IS_DELETE]=true;
		obj[C.IS_MENU]=false;
		_insert(C.AUTHORITY,obj);
		
		var obj={};
		obj[C.URL_NAME]=C.EASYSOFT+C.ADMIN+C.FAVORITE+C.SAVE;
		obj[C.ROLE_NAME]=rolename;
		_insert(C.AUTHORITY,obj);	
		
		var obj={};
		obj[C.URL_NAME]=C.EASYSOFT+C.ADMIN+C.FAVORITE+C.INSERT;
		obj[C.ROLE_NAME]=rolename;
		_insert(C.AUTHORITY,obj);	
		
		var obj={};
		obj[C.URL_NAME]=C.EASYSOFT+C.ADMIN+C.FAVORITE+C.REMOVE;
		obj[C.ROLE_NAME]=rolename;
		_insert(C.AUTHORITY,obj);

	var rolename=C.PUBLIC;
		var obj={};
		obj[C.URL_NAME]=C.EASYSOFT+C.INDEX;
		obj[C.ROLE_NAME]=rolename;
		obj[C.IS_MENU]=true;
		_insert(C.AUTHORITY,obj);

}})

