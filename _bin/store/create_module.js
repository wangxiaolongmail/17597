db.system.js.save({_id:"create_module",value:function (params) {
	var C=constant();
	db.module.remove();
	var obj={};
	obj["_id"]=C.FAVORITE;
	obj[C.MODULE_NAME]=C.FAVORITE;
	obj[C.MODULE_URL]="/easysoft/admin/start";
	obj[C.IS_PUBLIC]=false;
	db.module.insert(obj);
		
	var obj={};
	obj["_id"]=C.ADMIN_FAVORITE_LIST;
	obj[C.MODULE_NAME]=C.ADMIN_FAVORITE_LIST;
	obj[C.MODULE_URL]="/easysoft/admin/favorite/list";
	obj[C.IS_PUBLIC]=false;
	db.module.insert(obj);

	var obj={};
	obj["_id"]="INDEX";
	obj[C.MODULE_NAME]="INDEX";
	obj[C.MODULE_URL]="/";
	obj[C.IS_PUBLIC]=true;
	db.module.insert(obj);
	
	var obj={};
	obj["_id"]="LOGOUT";
	obj[C.MODULE_NAME]="LOGOUT";
	obj[C.MODULE_URL]="/e/Logout";
	obj[C.IS_PUBLIC]=true;
	db.module.insert(obj);
}})
