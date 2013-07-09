db.system.js.save({_id:"create_module",value:function () {
	var C=constant();
	db[C.MODULE].remove();
	
	var path="/";
	var COM="com.easysoft.service.";

	var obj={};
	obj[C.MODULE_NAME]=C.INDEX;
	obj[C.URL_NAME]=C.EASYSOFT+C.INDEX;
	obj[C.URL]=path;
	obj[C.SERVLET_CLASS]=COM+"Index";
	obj[C.METHOD]=C.GET;
	obj[C.IS_MENU]=true;
	_insert(C.MODULE,obj);
	
	var obj={};
	obj[C.MODULE_NAME]=C.INDEX;
	obj[C.URL_NAME]=C.EASYSOFT+C.GO;
	obj[C.URL]=path+"go";
	obj[C.SERVLET_CLASS]=COM+"Go";
	obj[C.METHOD]=C.GET;
	_insert(C.MODULE,obj);
	
	var path=path+"easysoft/";
	var obj={};
	obj[C.MODULE_NAME]=C.INDEX;
	obj[C.URL_NAME]=C.LOGOUT;
	obj[C.URL]=path+C.LOGOUT;
	obj[C.SERVLET_CLASS]=COM+"Logout";
	obj[C.METHOD]=C.GET;
	_insert(C.MODULE,obj);
	
	var obj={};
	obj[C.MODULE_NAME]=C.INDEX;
	obj[C.URL_NAME]=C.EASYSOFT+C.LOGIN;
	obj[C.URL]=path+"login";
	obj[C.SERVLET_CLASS]=COM+"Login";
	obj[C.METHOD]=C.GET;
	_insert(C.MODULE,obj);
	
	var obj={};
	obj[C.MODULE_NAME]=C.INDEX;
	obj[C.URL_NAME]=C.EASYSOFT+C.LOGINING;
	obj[C.URL]=path+"logining";
	obj[C.SERVLET_CLASS]=COM+"Logining";
	obj[C.METHOD]=C.POST;
	_insert(C.MODULE,obj);	
	
	var obj={};
	obj[C.MODULE_NAME]=C.INDEX;
	obj[C.URL_NAME]=C.EASYSOFT+C.LOGIN2;
	obj[C.URL]=path+C.LOGIN2;
	obj[C.SERVLET_CLASS]=COM+C.LOGIN2;
	obj[C.METHOD]=C.GET;
	_insert(C.MODULE,obj);	
	
	var obj={};
	obj[C.MODULE_NAME]=C.INDEX;
	obj[C.URL_NAME]=C.EASYSOFT+C.LOGINING2;
	obj[C.URL]=path+C.LOGINING2;
	obj[C.SERVLET_CLASS]=COM+C.LOGINING2;
	obj[C.METHOD]=C.POST;
	_insert(C.MODULE,obj);	
	
	var obj={};
	obj[C.MODULE_NAME]=C.INDEX;
	obj[C.URL_NAME]=C.EASYSOFT+C.REGISTER;
	obj[C.URL]=path+C.REGISTER;
	obj[C.SERVLET_CLASS]=COM+C.REGISTER;
	obj[C.METHOD]=C.GET;
	_insert(C.MODULE,obj);
		
	var obj={};
	obj[C.MODULE_NAME]=C.INDEX;
	obj[C.URL_NAME]=C.REGISTER+C.SUBMIT;
	obj[C.URL]=path+C.REGISTER+C.SUBMIT;
	obj[C.SERVLET_CLASS]=COM+C.REGISTER+C.SUBMIT;
	obj[C.METHOD]=C.POST;
	_insert(C.MODULE,obj);
	
	var obj={};
	obj[C.MODULE_NAME]=C.INDEX;
	obj[C.URL_NAME]=C.EASYSOFT+C.CHECK_CODE;
	obj[C.URL]=path+"check_code";
	obj[C.SERVLET_CLASS]=COM+"CheckCode";
	obj[C.METHOD]=C.GET;
	_insert(C.MODULE,obj);
	
	var path=path+"admin/";
	var COM=COM+"admin.";
	
	var obj={};
	obj[C.MODULE_NAME]=C.START;
	obj[C.URL_NAME]=C.EASYSOFT+C.ADMIN+C.START;
	obj[C.URL]=path+C.START;
	obj[C.SERVLET_CLASS]=COM+C.START;
	obj[C.METHOD]=C.GET;
	obj[C.IS_MENU]=true;
	_insert(C.MODULE,obj);
	
	var a=[C.FAVORITE,C.FAVORITE_TYPE,C.DEPARTMENT,C.ORGANIZE,C.ORGANIZE_TYPE];
	_each(a,function(k,v,i){
		var obj={};
		obj[C.MODULE_NAME]=v;
		obj[C.URL_NAME]=C.EASYSOFT+C.ADMIN+v+C.LIST;
		obj[C.URL]=path+v+"/"+C.LIST;
		obj[C.SERVLET_CLASS]=COM+v+"."+C.LIST;
		obj[C.METHOD]=C.GET;
		obj[C.IS_MENU]=true;
		obj[C.IS_NEW]=true;
		obj[C.IS_EDIT]=true;
		obj[C.IS_DELETE]=true;
		_insert(C.MODULE,obj);
			
		var obj={};
		obj[C.MODULE_NAME]=v;
		obj[C.URL_NAME]=C.EASYSOFT+C.ADMIN+v+C.INSERT;
		obj[C.URL]=path+v+"/"+C.INSERT;
		obj[C.SERVLET_CLASS]=COM+v+"."+C.INSERT;
		obj[C.METHOD]=C.GET;
		_insert(C.MODULE,obj);
			
		var obj={};
		obj[C.MODULE_NAME]=v;
		obj[C.URL_NAME]=C.EASYSOFT+C.ADMIN+v+C.UPDATE;
		obj[C.URL]=path+C.FAVORITE+"/"+C.UPDATE;
		obj[C.SERVLET_CLASS]=COM+v+"."+C.UPDATE;
		obj[C.METHOD]=C.GET;
		_insert(C.MODULE,obj);
			
		var obj={};
		obj[C.MODULE_NAME]=v;
		obj[C.URL_NAME]=C.EASYSOFT+C.ADMIN+v+C.UPDATE+C.SUBMIT;
		obj[C.URL]=path+C.FAVORITE+"/"+C.UPDATE+C.SUBMIT;
		obj[C.SERVLET_CLASS]=COM+v+"."+C.UPDATE+C.SUBMIT;
		obj[C.METHOD]=C.POST;
		_insert(C.MODULE,obj);	
			
		var obj={};
		obj[C.MODULE_NAME]=v;
		obj[C.URL_NAME]=C.EASYSOFT+C.ADMIN+v+C.INSERT+C.SUBMIT;
		obj[C.URL]=path+C.FAVORITE+"/"+C.INSERT+C.SUBMIT;
		obj[C.SERVLET_CLASS]=COM+v+"."+C.INSERT+C.SUBMIT;
		obj[C.METHOD]=C.POST;
		_insert(C.MODULE,obj);	
			
		var obj={};
		obj[C.MODULE_NAME]=v;
		obj[C.URL_NAME]=C.EASYSOFT+C.ADMIN+v+C.REMOVE;
		obj[C.URL]=path+v+"/"+C.REMOVE;
		obj[C.SERVLET_CLASS]=COM+v+"."+C.REMOVE;
		obj[C.METHOD]=C.GET;
		_insert(C.MODULE,obj);
	});	
	
}})
