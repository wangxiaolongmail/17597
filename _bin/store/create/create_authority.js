db.system.js.save({_id:"create_authority",value:function (params) {
	var C=constant();
	db.authority.remove();

	var obj={};
	obj[C.MODULE_NAME]=C.EASYSOFT_ADMIN_START;
	obj[C.ROLE_NAME]="r_wxl";
	obj[C.IS_NEW]=false;
	obj[C.IS_EDIT]=false;
	obj[C.IS_DELETE]=false;
	obj[C.IS_MENU]=true;
	db.authority.insert(obj);

	var obj={};
	obj[C.MODULE_NAME]=C.EASYSOFT_ADMIN_FAVORITE_LIST;
	obj[C.ROLE_NAME]="r_wxl";
	obj[C.IS_NEW]=true;
	obj[C.IS_EDIT]=true;
	obj[C.IS_DELETE]=true;
	obj[C.IS_MENU]=true;
	db.authority.insert(obj);

	var obj={};
	obj[C.MODULE_NAME]=C.EASYSOFT_ADMIN_FAVORITE_ADD;
	obj[C.ROLE_NAME]="r_wxl";
	obj[C.IS_NEW]=true;
	obj[C.IS_EDIT]=true;
	obj[C.IS_DELETE]=true;
	obj[C.IS_MENU]=false;
	db.authority.insert(obj);
	
	var obj={};
	obj[C.MODULE_NAME]=C.EASYSOFT_ADMIN_FAVORITE_SAVE;
	obj[C.ROLE_NAME]="r_wxl";
	db.authority.insert(obj);

	var obj={};
	obj[C.MODULE_NAME]=C.EASYSOFT_ADMIN_FAVORITE_TYPE_LIST;
	obj[C.ROLE_NAME]="r_wxl";
	obj[C.IS_NEW]=false;
	obj[C.IS_EDIT]=false;
	obj[C.IS_DELETE]=false;
	obj[C.IS_MENU]=true;
	db.authority.insert(obj);

	var obj={};
	obj[C.MODULE_NAME]=C.EASYSOFT_INDEX;
	obj[C.ROLE_NAME]="r_easysoft";
	obj[C.IS_MENU]=true;
	db.authority.insert(obj);

}})

