db.system.js.save({_id:"_get_role",value:function (name) {
	var C=constant();
	var a=db.role.find().toArray();
	var o={};
	_each(a,function(k,v,i){
		o[v[C.ROLE_NAME]]=_get_module_list(v[C.ROLE_NAME]);
	});
	return o;
}})

