db.system.js.save({_id:"create_module",value:function () {
	var C=constant();
	db.module.remove();
	var obj={};
	obj["_id"]=C.EASYSOFT_ADMIN_START;
	obj[C.MODULE_NAME]=C.EASYSOFT_ADMIN_START;
	obj[C.MODULE_URL]="/easysoft/admin/start";
	obj[C.SERVLET_CLASS]="com.easysoft.service.admin.Start";
	obj[C.METHOD]=C.GET;
	db.module.insert(obj);
		
	var obj={};
	obj["_id"]=C.EASYSOFT_ADMIN_FAVORITE_LIST;
	obj[C.MODULE_NAME]=C.EASYSOFT_ADMIN_FAVORITE_LIST;
	obj[C.MODULE_URL]="/easysoft/admin/favorite/list";
	obj[C.SERVLET_CLASS]="com.easysoft.service.admin.favorite.List";
	obj[C.METHOD]=C.GET;
	db.module.insert(obj);
		
	var obj={};
	obj["_id"]=C.EASYSOFT_ADMIN_FAVORITE_ADD;
	obj[C.MODULE_NAME]=C.EASYSOFT_ADMIN_FAVORITE_ADD;
	obj[C.MODULE_URL]="/easysoft/admin/favorite/add";
	obj[C.SERVLET_CLASS]="com.easysoft.service.admin.favorite.Add";
	obj[C.METHOD]=C.GET;
	db.module.insert(obj);
		
	var obj={};
	obj["_id"]=C.EASYSOFT_ADMIN_FAVORITE_SAVE;
	obj[C.MODULE_NAME]=C.EASYSOFT_ADMIN_FAVORITE_SAVE;
	obj[C.MODULE_URL]="/easysoft/admin/favorite/save";
	obj[C.SERVLET_CLASS]="com.easysoft.service.admin.favorite.Save";
	obj[C.METHOD]=C.POST;
	db.module.insert(obj);	
		
	var obj={};
	obj["_id"]=C.EASYSOFT_ADMIN_FAVORITE_INSERT;
	obj[C.MODULE_NAME]=C.EASYSOFT_ADMIN_FAVORITE_INSERT;
	obj[C.MODULE_URL]="/easysoft/admin/favorite/insert";
	obj[C.SERVLET_CLASS]="com.easysoft.service.admin.favorite.Insert";
	obj[C.METHOD]=C.POST;
	db.module.insert(obj);
		
	var obj={};
	obj["_id"]=C.EASYSOFT_ADMIN_FAVORITE_TYPE_LIST;
	obj[C.MODULE_NAME]=C.EASYSOFT_ADMIN_FAVORITE_TYPE_LIST;
	obj[C.MODULE_URL]="/easysoft/admin/favorite_type/list";
	obj[C.SERVLET_CLASS]="com.easysoft.service.admin.favorite_type.List";
	obj[C.METHOD]=C.GET;
	db.module.insert(obj);

	var obj={};
	obj["_id"]=C.EASYSOFT_INDEX;
	obj[C.MODULE_NAME]=C.EASYSOFT_INDEX;
	obj[C.MODULE_URL]="/";
	obj[C.SERVLET_CLASS]="com.easysoft.service.Index";
	obj[C.METHOD]=C.GET;
	db.module.insert(obj);
	
	var obj={};
	obj["_id"]=C.LOGOUT;
	obj[C.MODULE_NAME]=C.LOGOUT;
	obj[C.MODULE_URL]="/easysoft/Logout";
	obj[C.SERVLET_CLASS]="com.easysoft.service.Logout";
	obj[C.METHOD]=C.GET;
	db.module.insert(obj);
	
	var obj={};
	obj["_id"]=C.EASYSOFT_LOGIN;
	obj[C.MODULE_NAME]=C.EASYSOFT_LOGIN;
	obj[C.MODULE_URL]="/easysoft/login";
	obj[C.SERVLET_CLASS]="com.easysoft.service.Login";
	obj[C.METHOD]=C.GET;
	db.module.insert(obj);
	
	var obj={};
	obj["_id"]=C.EASYSOFT_LOGINING;
	obj[C.MODULE_NAME]=C.EASYSOFT_LOGINING;
	obj[C.MODULE_URL]="/easysoft/logining";
	obj[C.SERVLET_CLASS]="com.easysoft.service.Logining";
	obj[C.METHOD]=C.POST;
	db.module.insert(obj);
	
	var obj={};
	obj["_id"]=C.EASYSOFT_CHECK_CODE;
	obj[C.MODULE_NAME]=C.EASYSOFT_CHECK_CODE;
	obj[C.MODULE_URL]="/easysoft/check_code";
	obj[C.SERVLET_CLASS]="com.easysoft.service.CheckCode";
	obj[C.METHOD]=C.GET;
	db.module.insert(obj);
	
	var obj={};
	obj["_id"]=C.EASYSOFT_GO;
	obj[C.MODULE_NAME]=C.EASYSOFT_GO;
	obj[C.MODULE_URL]="/go";
	obj[C.SERVLET_CLASS]="com.easysoft.service.Go";
	obj[C.METHOD]=C.GET;
	db.module.insert(obj);
}})
