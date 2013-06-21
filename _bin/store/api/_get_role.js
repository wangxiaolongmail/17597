db.system.js.save({_id:"_get_role",value:function (name) {
	var C=constant();
	var a=db.role.find().toArray();
	var o={};
	_each(a,function(k,v,i){
		var op={};
		op[C.IS_GUEST]=v[C.IS_GUEST];
		op[C.LEFT]=_get_module_list(v[C.ROLE_NAME]);
		if(v[C.IS_GUEST]){
			var oo={};
			oo[C.MODULE_NAME]=C.EASYSOFT+C.LOGIN;
			oo[C.MODULE_URL]=_get_url(C.EASYSOFT+C.LOGIN);
		}else{
			var oo={};
			oo[C.MODULE_NAME]=C.LOGOUT;
			oo[C.MODULE_URL]=_get_url(C.LOGOUT);
		}
		op[C.RIGHT]=[oo];
		o[v[C.ROLE_NAME]]=op;
	});
	return o;
}})

