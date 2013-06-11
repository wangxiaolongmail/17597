db.system.js.save({_id:"create_authority",value:function (params) {
	var C=constant();
	db.authority.remove();
	var obj={};
	obj[C.MODULE_NAME]=C.EASYSOFT_ADMIN_START;
	obj[C.ROLE_NAME]="r_wxl";
	obj[C.IS_NEW]=false;
	obj[C.IS_EDIT]=false;
	obj[C.IS_DELETE]=false;
	db.authority.insert(obj);
	var obj={};
	obj[C.MODULE_NAME]=C.EASYSOFT_ADMIN_FAVORITE_LIST;
	obj[C.ROLE_NAME]="r_wxl";
	obj[C.IS_NEW]=false;
	obj[C.IS_EDIT]=false;
	obj[C.IS_DELETE]=false;
	db.authority.insert(obj);

	var obj={};
	obj[C.MODULE_NAME]=C.EASYSOFT_INDEX;
	obj[C.ROLE_NAME]="r_easysoft";
	db.authority.insert(obj);

}})

