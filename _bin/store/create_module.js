db.system.js.save({_id:"create_module",value:function (params) {
	var C=constant();
	db.module.remove();
	var obj={};
	obj["_id"]=C.FAVORITE;
	obj[C.MODULE_NAME]=C.FAVORITE;
	obj[C.MODULE_URL]="/easysoft/admin/start";
	db.module.insert(obj);
	
	var obj={};
	obj["_id"]=C.ADMIN_FAVORITE_LIST;
	obj[C.MODULE_NAME]=C.ADMIN_FAVORITE_LIST;
	obj[C.MODULE_URL]="/easysoft/admin/favorite/list";
	db.module.insert(obj);
}})
