db.system.js.save({_id:"admin_Index",value:function (params) {
	var pub=public();
	var C=constant();
	var params=params||{};
	var obj=checking_session(params);
	if(obj.ok){
		var op={ok:true};
		op[C.MODULE_LIST]=obj[C.MODULE_LIST];
		op[C.CURRENT_MODULE]=obj[C.CURRENT_MODULE];
		return op;
	}else{
		return obj;
	}
}})
