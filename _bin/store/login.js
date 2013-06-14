db.system.js.save({_id:"login",value:function (params) {
	var C=constant();
	var op={};
	op[C.MODULE_URL]=_get_url(C.EASYSOFT_LOGINING);
	op.ok=true;
	op.mid=_push_mdata(_get_check_code());
	op[C.EASYSOFT_CHECK_CODE]=_get_url(C.EASYSOFT_CHECK_CODE);
	return op;
}})



