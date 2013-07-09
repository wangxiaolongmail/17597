db.system.js.save({_id:"create_authority",value:function (params) {
	var C=constant();
	db[C.AUTHORITY].remove();
	
	var rolename=C.EASYSOFT;
		var a=db.module.find({"MODULE_NAME":C.FAVORITE_TYPE}).toArray();
		_each(a,function(k,v,i){
			delete v["_id"];
			v[C.ROLE_NAME]=rolename;
			_insert(C.AUTHORITY,v);
		});
		var a=db.module.find({"MODULE_NAME":C.DEPARTMENT}).toArray();
		_each(a,function(k,v,i){
			delete v["_id"];
			v[C.ROLE_NAME]=rolename;
			_insert(C.AUTHORITY,v);
		});
		var a=db.module.find({"MODULE_NAME":C.ORGANIZE}).toArray();
		_each(a,function(k,v,i){
			delete v["_id"];
			v[C.ROLE_NAME]=rolename;
			_insert(C.AUTHORITY,v);
		});
		var a=db.module.find({"MODULE_NAME":C.ORGANIZE_TYPE}).toArray();
		_each(a,function(k,v,i){
			delete v["_id"];
			v[C.ROLE_NAME]=rolename;
			_insert(C.AUTHORITY,v);
		});
	
	var rolename=C.REGISTER;
		var a=db.module.find({"MODULE_NAME":C.START}).toArray();
		_each(a,function(k,v,i){
			delete v["_id"];
			v[C.ROLE_NAME]=rolename;
			_insert(C.AUTHORITY,v);
		});
		var a=db.module.find({"MODULE_NAME":C.FAVORITE}).toArray();
		_each(a,function(k,v,i){
			delete v["_id"];
			v[C.ROLE_NAME]=rolename;
			_insert(C.AUTHORITY,v);
		});
		var a=db.module.find({"MODULE_NAME":C.PROFILE}).toArray();
		_each(a,function(k,v,i){
			delete v["_id"];
			v[C.ROLE_NAME]=rolename;
			_insert(C.AUTHORITY,v);
		});
	
	var rolename=C.PUBLIC;
		var a=db.module.find({"MODULE_NAME":C.INDEX}).toArray();
		_each(a,function(k,v,i){
			delete v["_id"];
			v[C.ROLE_NAME]=rolename;
			_insert(C.AUTHORITY,v);
		});
}})

