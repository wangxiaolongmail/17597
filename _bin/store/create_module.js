db.system.js.save({_id:"create_module",value:function (params) {
	var C=constant();
	db.module.remove();
	var obj={};
	obj["_id"]=C.FAVORITE;
	obj[C.MODULE_NAME]=C.FAVORITE;
	obj[C.MODULE_URL]="/easysoft/admin/start";
	obj[C.IS_NEW]=true;
	obj[C.IS_EDIT]=true;
	obj[C.IS_DELETE]=true;
	obj[C.IS_CATEGORY]=true;
	db.module.insert(obj);
}})
