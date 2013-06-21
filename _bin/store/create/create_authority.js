db.system.js.save({_id:"create_authority",value:function (params) {
	var C=constant();
	db.authority.remove();
	
	var rolename=C.ROLE+C.EASYSOFT;
	var obj=_geto();
	obj[C.MODULE_NAME]=C.EASYSOFT+C.ADMIN+C.START;;
	obj[C.ROLE_NAME]=rolename;
	obj[C.IS_NEW]=false;
	obj[C.IS_EDIT]=false;
	obj[C.IS_DELETE]=false;
	obj[C.IS_MENU]=true;
	db.authority.insert(obj);

	var obj={};
	obj[C.MODULE_NAME]=C.EASYSOFT+C.ADMIN+C.FAVORITE+C.LIST;
	obj[C.ROLE_NAME]=rolename;
	obj[C.IS_NEW]=true;
	obj[C.IS_EDIT]=true;
	obj[C.IS_DELETE]=true;
	obj[C.IS_MENU]=true;
	db.authority.insert(obj);

	var obj={};
	obj[C.MODULE_NAME]=C.EASYSOFT+C.ADMIN+C.FAVORITE+C.ADD;
	obj[C.ROLE_NAME]=rolename;
	obj[C.IS_NEW]=true;
	obj[C.IS_EDIT]=true;
	obj[C.IS_DELETE]=true;
	obj[C.IS_MENU]=false;
	db.authority.insert(obj);
	
	var obj={};
	obj[C.MODULE_NAME]=C.EASYSOFT+C.ADMIN+C.FAVORITE+C.SAVE;
	obj[C.ROLE_NAME]=rolename;
	db.authority.insert(obj);	
	
	var obj={};
	obj[C.MODULE_NAME]=C.EASYSOFT+C.ADMIN+C.FAVORITE+C.INSERT;
	obj[C.ROLE_NAME]=rolename;
	db.authority.insert(obj);

	var obj={};
	obj[C.MODULE_NAME]=C.EASYSOFT+C.ADMIN+C.FAVORITE_TYPE+C.LIST;
	obj[C.ROLE_NAME]=rolename;
	obj[C.IS_NEW]=false;
	obj[C.IS_EDIT]=false;
	obj[C.IS_DELETE]=false;
	obj[C.IS_MENU]=true;
	db.authority.insert(obj);

	var rolename=C.ROLE+C.PUBLIC;
	var obj={};
	obj[C.MODULE_NAME]=C.EASYSOFT+C.INDEX;
	obj[C.ROLE_NAME]=rolename;
	obj[C.IS_MENU]=true;
	db.authority.insert(obj);

}})

