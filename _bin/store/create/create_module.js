db.system.js.save({_id:"create_module",value:function () {
	var C=constant();
	db.module.remove();
	var obj={};
	obj["_id"]=C.EASYSOFT_ADMIN_START;
	obj[C.MODULE_NAME]=C.EASYSOFT_ADMIN_START;
	obj[C.MODULE_URL]="/easysoft/admin/start";
	obj[C.SERVLET_CLASS]="com.easysoft.service.admin.Start";
	obj[C.IS_PUBLIC]=false;
	obj[C.METHOD]=C.GET;
	db.module.insert(obj);
		
	var obj={};
	obj["_id"]=C.EASYSOFT_ADMIN_FAVORITE_LIST;
	obj[C.MODULE_NAME]=C.EASYSOFT_ADMIN_FAVORITE_LIST;
	obj[C.MODULE_URL]="/easysoft/admin/favorite/list";
	obj[C.SERVLET_CLASS]="com.easysoft.service.admin.favorite.List";
	obj[C.IS_PUBLIC]=false;
	obj[C.METHOD]=C.GET;
	db.module.insert(obj);
		
	var obj={};
	obj["_id"]=C.EASYSOFT_ADMIN_FAVORITE_TYPE_LIST;
	obj[C.MODULE_NAME]=C.EASYSOFT_ADMIN_FAVORITE_TYPE_LIST;
	obj[C.MODULE_URL]="/easysoft/admin/favorite_type/list";
	obj[C.SERVLET_CLASS]="com.easysoft.service.admin.favorite_type.List";
	obj[C.IS_PUBLIC]=false;
	obj[C.METHOD]=C.GET;
	db.module.insert(obj);

	var obj={};
	obj["_id"]=C.EASYSOFT_INDEX;
	obj[C.MODULE_NAME]=C.EASYSOFT_INDEX;
	obj[C.MODULE_URL]="/";
	obj[C.SERVLET_CLASS]="com.easysoft.service.Index";
	obj[C.IS_PUBLIC]=true;
	obj[C.METHOD]=C.GET;
	db.module.insert(obj);
	
	var obj={};
	obj["_id"]=C.LOGOUT;
	obj[C.MODULE_NAME]=C.LOGOUT;
	obj[C.MODULE_URL]="/e/Logout";
	obj[C.SERVLET_CLASS]="com.easysoft.service.Logout";
	obj[C.IS_PUBLIC]=true;
	obj[C.METHOD]=C.GET;
	db.module.insert(obj);
	
	var obj={};
	obj["_id"]=C.EASYSOFT_LOGIN;
	obj[C.MODULE_NAME]=C.EASYSOFT_LOGIN;
	obj[C.MODULE_URL]="/e/login";
	obj[C.SERVLET_CLASS]="com.easysoft.service.Login";
	obj[C.IS_PUBLIC]=true;
	obj[C.METHOD]=C.GET;
	db.module.insert(obj);
	
	var obj={};
	obj["_id"]=C.EASYSOFT_LOGINING;
	obj[C.MODULE_NAME]=C.EASYSOFT_LOGINING;
	obj[C.MODULE_URL]="/e/logining";
	obj[C.SERVLET_CLASS]="com.easysoft.service.Logining";
	obj[C.IS_PUBLIC]=true;
	obj[C.METHOD]=C.POST;
	db.module.insert(obj);
	
	var obj={};
	obj["_id"]=C.EASYSOFT_CHECK_CODE;
	obj[C.MODULE_NAME]=C.EASYSOFT_CHECK_CODE;
	obj[C.MODULE_URL]="/e/check_code";
	obj[C.SERVLET_CLASS]="com.easysoft.service.CheckCode";
	obj[C.IS_PUBLIC]=true;
	obj[C.METHOD]=C.GET;
	db.module.insert(obj);
	
	var obj={};
	obj["_id"]=C.EASYSOFT_GO;
	obj[C.MODULE_NAME]=C.EASYSOFT_GO;
	obj[C.MODULE_URL]="/go";
	obj[C.SERVLET_CLASS]="com.easysoft.service.Go";
	obj[C.IS_PUBLIC]=true;
	obj[C.METHOD]=C.GET;
	db.module.insert(obj);
}})
