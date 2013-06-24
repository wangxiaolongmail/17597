db.system.js.save({_id:"loginingCheckCode",value:function (params) {
	var C=constant();
	var op={};
	op[C.MODULE_URL]=_get_url(C.EASYSOFT+C.LOGINING);
	var obj=_get_mdata(params[C.MID]);
	_mixin(op,obj);
	op.ok=true;
	return op;
}})



