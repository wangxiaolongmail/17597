db.system.js.save({_id:"get_check_code",value:function (params) {
	var C=constant();
	var mid = params.mid;
	return _get_mdata(mid)[C.CHECK_CODE];
}})
