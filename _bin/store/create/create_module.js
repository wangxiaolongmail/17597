db.system.js.save({_id:"create_module",value:function () {
	var C=constant();
	db[C.MODULE].remove();
	
	var path="/";
	var obj={};
	obj[C.MODULE_NAME]=C.INDEX;
	obj[C.URL_NAME]=C.EASYSOFT+C.INDEX;
	obj[C.URL]=path;
	obj[C.SERVLET_CLASS]="com.easysoft.service.Index";
	obj[C.METHOD]=C.GET;
	obj[C.IS_MENU]=true;
	_insert(C.MODULE,obj);
	
	var obj={};
	obj[C.MODULE_NAME]=C.INDEX;
	obj[C.URL_NAME]=C.EASYSOFT+C.GO;
	obj[C.URL]=path+"go";
	obj[C.SERVLET_CLASS]="com.easysoft.service.Go";
	obj[C.METHOD]=C.GET;
	_insert(C.MODULE,obj);
	
	var path=path+"easysoft/";
	var obj={};
	obj[C.MODULE_NAME]=C.INDEX;
	obj[C.URL_NAME]=C.LOGOUT;
	obj[C.URL]=path+C.LOGOUT;
	obj[C.SERVLET_CLASS]="com.easysoft.service.Logout";
	obj[C.METHOD]=C.GET;
	_insert(C.MODULE,obj);
	
	var obj={};
	obj[C.MODULE_NAME]=C.INDEX;
	obj[C.URL_NAME]=C.EASYSOFT+C.LOGIN;
	obj[C.URL]=path+"login";
	obj[C.SERVLET_CLASS]="com.easysoft.service.Login";
	obj[C.METHOD]=C.GET;
	_insert(C.MODULE,obj);
	
	var obj={};
	obj[C.MODULE_NAME]=C.INDEX;
	obj[C.URL_NAME]=C.EASYSOFT+C.LOGINING;
	obj[C.URL]=path+"logining";
	obj[C.SERVLET_CLASS]="com.easysoft.service.Logining";
	obj[C.METHOD]=C.POST;
	_insert(C.MODULE,obj);	
	
	var obj={};
	obj[C.MODULE_NAME]=C.INDEX;
	obj[C.URL_NAME]=C.EASYSOFT+C.LOGIN2;
	obj[C.URL]=path+C.LOGIN2;
	obj[C.SERVLET_CLASS]="com.easysoft.service."+C.LOGIN2;
	obj[C.METHOD]=C.GET;
	_insert(C.MODULE,obj);	
	
	var obj={};
	obj[C.MODULE_NAME]=C.INDEX;
	obj[C.URL_NAME]=C.EASYSOFT+C.LOGINING2;
	obj[C.URL]=path+C.LOGINING2;
	obj[C.SERVLET_CLASS]="com.easysoft.service."+C.LOGINING2;
	obj[C.METHOD]=C.POST;
	_insert(C.MODULE,obj);	
	
	var obj={};
	obj[C.MODULE_NAME]=C.INDEX;
	obj[C.URL_NAME]=C.EASYSOFT+C.REGISTER;
	obj[C.URL]=path+C.REGISTER;
	obj[C.SERVLET_CLASS]="com.easysoft.service."+C.REGISTER;
	obj[C.METHOD]=C.GET;
	_insert(C.MODULE,obj);
		
	var obj={};
	obj[C.MODULE_NAME]=C.INDEX;
	obj[C.URL_NAME]=C.REGISTER+C.SUBMIT;
	obj[C.URL]=path+C.REGISTER+C.SUBMIT;
	obj[C.SERVLET_CLASS]="com.easysoft.service."+C.REGISTER+C.SUBMIT;
	obj[C.METHOD]=C.POST;
	_insert(C.MODULE,obj);
	
	var obj={};
	obj[C.MODULE_NAME]=C.INDEX;
	obj[C.URL_NAME]=C.EASYSOFT+C.CHECK_CODE;
	obj[C.URL]=path+"check_code";
	obj[C.SERVLET_CLASS]="com.easysoft.service.CheckCode";
	obj[C.METHOD]=C.GET;
	_insert(C.MODULE,obj);
	
	var path=path+"admin/";
	
	var obj={};
	obj[C.MODULE_NAME]=C.START;
	obj[C.URL_NAME]=C.EASYSOFT+C.ADMIN+C.START;
	obj[C.URL]=path+C.START;
	obj[C.SERVLET_CLASS]="com.easysoft.service.admin."+C.START;
	obj[C.METHOD]=C.GET;
	obj[C.IS_MENU]=true;
	_insert(C.MODULE,obj);
		
	var obj={};
	obj[C.MODULE_NAME]=C.FAVORITE;
	obj[C.URL_NAME]=C.EASYSOFT+C.ADMIN+C.FAVORITE+C.LIST;
	obj[C.URL]=path+C.FAVORITE+"/"+C.LIST;
	obj[C.SERVLET_CLASS]="com.easysoft.service.admin."+C.FAVORITE+"."+C.LIST;
	obj[C.METHOD]=C.GET;
	obj[C.IS_MENU]=true;
	obj[C.IS_NEW]=true;
	obj[C.IS_EDIT]=true;
	obj[C.IS_DELETE]=true;
	_insert(C.MODULE,obj);
		
	var obj={};
	obj[C.MODULE_NAME]=C.FAVORITE;
	obj[C.URL_NAME]=C.EASYSOFT+C.ADMIN+C.FAVORITE+C.INSERT;
	obj[C.URL]=path+C.FAVORITE+"/"+C.INSERT;
	obj[C.SERVLET_CLASS]="com.easysoft.service.admin."+C.FAVORITE+"."+C.INSERT;
	obj[C.METHOD]=C.GET;
	_insert(C.MODULE,obj);
		
	var obj={};
	obj[C.MODULE_NAME]=C.FAVORITE;
	obj[C.URL_NAME]=C.EASYSOFT+C.ADMIN+C.FAVORITE+C.UPDATE;
	obj[C.URL]=path+C.FAVORITE+"/"+C.UPDATE;
	obj[C.SERVLET_CLASS]="com.easysoft.service.admin."+C.FAVORITE+"."+C.UPDATE;
	obj[C.METHOD]=C.GET;
	_insert(C.MODULE,obj);
		
	var obj={};
	obj[C.MODULE_NAME]=C.FAVORITE;
	obj[C.URL_NAME]=C.EASYSOFT+C.ADMIN+C.FAVORITE+C.UPDATE+C.SUBMIT;
	obj[C.URL]=path+C.FAVORITE+"/"+C.UPDATE+C.SUBMIT;
	obj[C.SERVLET_CLASS]="com.easysoft.service.admin."+C.FAVORITE+"."+C.UPDATE+C.SUBMIT;
	obj[C.METHOD]=C.POST;
	_insert(C.MODULE,obj);	
		
	var obj={};
	obj[C.MODULE_NAME]=C.FAVORITE;
	obj[C.URL_NAME]=C.EASYSOFT+C.ADMIN+C.FAVORITE+C.INSERT+C.SUBMIT;
	obj[C.URL]=path+C.FAVORITE+"/"+C.INSERT+C.SUBMIT;
	obj[C.SERVLET_CLASS]="com.easysoft.service.admin."+C.FAVORITE+"."+C.INSERT+C.SUBMIT;
	obj[C.METHOD]=C.POST;
	_insert(C.MODULE,obj);	
		
	var obj={};
	obj[C.MODULE_NAME]=C.FAVORITE;
	obj[C.URL_NAME]=C.EASYSOFT+C.ADMIN+C.FAVORITE+C.REMOVE;
	obj[C.URL]=path+C.FAVORITE+"/"+C.REMOVE;
	obj[C.SERVLET_CLASS]="com.easysoft.service.admin."+C.FAVORITE+"."+C.REMOVE;
	obj[C.METHOD]=C.GET;
	_insert(C.MODULE,obj);
		
	var obj={};
	obj[C.MODULE_NAME]=C.FAVORITE_TYPE;
	obj[C.URL_NAME]=C.EASYSOFT+C.ADMIN+C.FAVORITE_TYPE+C.LIST;
	obj[C.URL]=path+C.FAVORITE_TYPE+"/"+C.LIST;
	obj[C.SERVLET_CLASS]="com.easysoft.service.admin."+C.FAVORITE_TYPE+"."+C.LIST;
	obj[C.METHOD]=C.GET;
	obj[C.IS_MENU]=true;
	obj[C.IS_NEW]=true;
	obj[C.IS_EDIT]=true;
	obj[C.IS_DELETE]=true;
	_insert(C.MODULE,obj);
		
	var obj={};
	obj[C.MODULE_NAME]=C.FAVORITE_TYPE;
	obj[C.URL_NAME]=C.EASYSOFT+C.ADMIN+C.FAVORITE_TYPE+C.INSERT;
	obj[C.URL]=path+C.FAVORITE_TYPE+"/"+C.INSERT;
	obj[C.SERVLET_CLASS]="com.easysoft.service.admin."+C.FAVORITE_TYPE+"."+C.INSERT;
	obj[C.METHOD]=C.GET;
	_insert(C.MODULE,obj);
		
	var obj={};
	obj[C.MODULE_NAME]=C.FAVORITE_TYPE;
	obj[C.URL_NAME]=C.EASYSOFT+C.ADMIN+C.FAVORITE_TYPE+C.INSERT+C.SUBMIT;
	obj[C.URL]=path+C.FAVORITE_TYPE+"/"+C.INSERT+C.SUBMIT;
	obj[C.SERVLET_CLASS]="com.easysoft.service.admin."+C.FAVORITE_TYPE+"."+C.INSERT+C.SUBMIT;
	obj[C.METHOD]=C.POST;
	_insert(C.MODULE,obj);
		
	var obj={};
	obj[C.MODULE_NAME]=C.FAVORITE_TYPE;
	obj[C.URL_NAME]=C.EASYSOFT+C.ADMIN+C.FAVORITE_TYPE+C.UPDATE;
	obj[C.URL]=path+C.FAVORITE_TYPE+"/Update";
	obj[C.SERVLET_CLASS]="com.easysoft.service.admin."+C.FAVORITE_TYPE+".Update";
	obj[C.METHOD]=C.GET;
	_insert(C.MODULE,obj);
		
	var obj={};
	obj[C.MODULE_NAME]=C.FAVORITE_TYPE;
	obj[C.URL_NAME]=C.EASYSOFT+C.ADMIN+C.FAVORITE_TYPE+C.UPDATE+C.SUBMIT;
	obj[C.URL]=path+C.FAVORITE_TYPE+"/"+C.UPDATE+C.SUBMIT;
	obj[C.SERVLET_CLASS]="com.easysoft.service.admin."+C.FAVORITE_TYPE+"."+C.UPDATE+C.SUBMIT;
	obj[C.METHOD]=C.POST;
	_insert(C.MODULE,obj);	
		
	var obj={};
	obj[C.MODULE_NAME]=C.FAVORITE_TYPE;
	obj[C.URL_NAME]=C.EASYSOFT+C.ADMIN+C.FAVORITE_TYPE+C.REMOVE;
	obj[C.URL]=path+C.FAVORITE_TYPE+"/"+C.REMOVE;
	obj[C.SERVLET_CLASS]="com.easysoft.service.admin."+C.FAVORITE_TYPE+"."+C.REMOVE;
	obj[C.METHOD]=C.GET;
	_insert(C.MODULE,obj);
}})
