db.system.js.save({_id:"_get_role",value:function (name) {
	var C=constant();
	var a=db.role.find().toArray();
	var o={};
	_each(a,function(k,v,i){
		var op={};
		_mixin(op,v);
		op[C.LEFT]=_get_module_list(v[C.ROLE_NAME]);
		var list=[];
		if(v[C.IS_GUEST]){
			var oo={};
			oo[C.MODULE_NAME]=C.REGISTER;
			oo[C.URL]=_get_url(C.EASYSOFT+C.REGISTER);
			list.push(oo);
			var oo={};
			oo[C.MODULE_NAME]=C.LOGIN;
			oo[C.URL]=_get_url(C.EASYSOFT+C.LOGIN);
			list.push(oo);
		}else{
			var oo={};
			oo[C.MODULE_NAME]=C.LOGOUT;
			oo[C.URL]=_get_url(C.LOGOUT);
			list.push(oo);
		}
		op[C.RIGHT]=list;
		o[v[C.ROLE_NAME]]=op;
	});
	return o;
}})

