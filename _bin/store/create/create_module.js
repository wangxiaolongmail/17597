db.system.js.save({_id:"create_module",value:function () {
	var C=constant();
	db[C.MODULE].remove();
	var obj={};
	obj[C.MODULE_NAME]=C.EASYSOFT+C.ADMIN+C.START;
	obj[C.MODULE_URL]="/easysoft/admin/start";
	obj[C.SERVLET_CLASS]="com.easysoft.service.admin.Start";
	obj[C.METHOD]=C.GET;
	_insert(C.MODULE,obj);
		
	var obj={};
	obj[C.MODULE_NAME]=C.EASYSOFT+C.ADMIN+C.FAVORITE+C.LIST;
	obj[C.MODULE_URL]="/easysoft/admin/favorite/list";
	obj[C.SERVLET_CLASS]="com.easysoft.service.admin.favorite.List";
	obj[C.METHOD]=C.GET;
	_insert(C.MODULE,obj);
		
	var obj={};
	obj[C.MODULE_NAME]=C.EASYSOFT+C.ADMIN+C.FAVORITE+C.ADD;
	obj[C.MODULE_URL]="/easysoft/admin/favorite/add";
	obj[C.SERVLET_CLASS]="com.easysoft.service.admin.favorite.Add";
	obj[C.METHOD]=C.GET;
	_insert(C.MODULE,obj);
		
	var obj={};
	obj[C.MODULE_NAME]=C.EASYSOFT+C.ADMIN+C.FAVORITE+C.SAVE;
	obj[C.MODULE_URL]="/easysoft/admin/favorite/save";
	obj[C.SERVLET_CLASS]="com.easysoft.service.admin.favorite.Save";
	obj[C.METHOD]=C.POST;
	_insert(C.MODULE,obj);	
		
	var obj={};
	obj[C.MODULE_NAME]=C.EASYSOFT+C.ADMIN+C.FAVORITE+C.INSERT;
	obj[C.MODULE_URL]="/easysoft/admin/favorite/insert";
	obj[C.SERVLET_CLASS]="com.easysoft.service.admin.favorite.Insert";
	obj[C.METHOD]=C.POST;
	_insert(C.MODULE,obj);
		
	var obj={};
	obj[C.MODULE_NAME]=C.EASYSOFT+C.ADMIN+C.FAVORITE_TYPE+C.LIST;
	obj[C.MODULE_URL]="/easysoft/admin/favorite_type/list";
	obj[C.SERVLET_CLASS]="com.easysoft.service.admin.favorite_type.List";
	obj[C.METHOD]=C.GET;
	_insert(C.MODULE,obj);
		
	var obj={};
	obj[C.MODULE_NAME]=C.EASYSOFT+C.ADMIN+C.FAVORITE_TYPE+C.ADD;
	obj[C.MODULE_URL]="/easysoft/admin/favorite_type/add";
	obj[C.SERVLET_CLASS]="com.easysoft.service.admin.favorite_type.Add";
	obj[C.METHOD]=C.GET;
	_insert(C.MODULE,obj);
		
	var obj={};
	obj[C.MODULE_NAME]=C.EASYSOFT+C.ADMIN+C.FAVORITE_TYPE+C.SAVE;
	obj[C.MODULE_URL]="/easysoft/admin/favorite_type/save";
	obj[C.SERVLET_CLASS]="com.easysoft.service.admin.favorite_type.Save";
	obj[C.METHOD]=C.POST;
	_insert(C.MODULE,obj);	
		
	var obj={};
	obj[C.MODULE_NAME]=C.EASYSOFT+C.ADMIN+C.FAVORITE_TYPE+C.INSERT;
	obj[C.MODULE_URL]="/easysoft/admin/favorite_type/insert";
	obj[C.SERVLET_CLASS]="com.easysoft.service.admin.favorite_type.Insert";
	obj[C.METHOD]=C.POST;
	_insert(C.MODULE,obj);

	var obj={};
	obj[C.MODULE_NAME]=C.EASYSOFT+C.INDEX;
	obj[C.MODULE_URL]="/";
	obj[C.SERVLET_CLASS]="com.easysoft.service.Index";
	obj[C.METHOD]=C.GET;
	_insert(C.MODULE,obj);
	
	var obj={};
	obj[C.MODULE_NAME]=C.LOGOUT;
	obj[C.MODULE_URL]="/easysoft/Logout";
	obj[C.SERVLET_CLASS]="com.easysoft.service.Logout";
	obj[C.METHOD]=C.GET;
	_insert(C.MODULE,obj);
	
	var obj={};
	obj[C.MODULE_NAME]=C.EASYSOFT+C.LOGIN;
	obj[C.MODULE_URL]="/easysoft/login";
	obj[C.SERVLET_CLASS]="com.easysoft.service.Login";
	obj[C.METHOD]=C.GET;
	_insert(C.MODULE,obj);
	
	var obj={};
	obj[C.MODULE_NAME]=C.EASYSOFT+C.LOGINING;
	obj[C.MODULE_URL]="/easysoft/logining";
	obj[C.SERVLET_CLASS]="com.easysoft.service.Logining";
	obj[C.METHOD]=C.POST;
	_insert(C.MODULE,obj);	
	
	var obj={};
	obj[C.MODULE_NAME]=C.EASYSOFT+C.LOGIN2;
	obj[C.MODULE_URL]="/easysoft/"+C.LOGIN2;
	obj[C.SERVLET_CLASS]="com.easysoft.service."+C.LOGIN2;
	obj[C.METHOD]=C.GET;
	_insert(C.MODULE,obj);
	
	var obj={};
	obj[C.MODULE_NAME]=C.EASYSOFT+C.CHECK_CODE;
	obj[C.MODULE_URL]="/easysoft/check_code";
	obj[C.SERVLET_CLASS]="com.easysoft.service.CheckCode";
	obj[C.METHOD]=C.GET;
	_insert(C.MODULE,obj);
	
	var obj={};
	obj[C.MODULE_NAME]=C.EASYSOFT+C.GO;
	obj[C.MODULE_URL]="/go";
	obj[C.SERVLET_CLASS]="com.easysoft.service.Go";
	obj[C.METHOD]=C.GET;
	_insert(C.MODULE,obj);

}})
