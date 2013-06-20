db.system.js.save({_id:"login",value:function (params) {
	var C=constant();
	var op={};
	op[C.MODULE_URL]=_get_url(C.EASYSOFT+C.LOGINING);
	op.ok=true;
	op.mid=_push_mdata(_create_check_code());
	op[C.CHECK_CODE]=_get_url(C.EASYSOFT+C.CHECK_CODE);
	return op;
}})



