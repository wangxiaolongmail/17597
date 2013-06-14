db.system.js.save({_id:"_push_log",value:function (params) {
	var C=constant();
	var op={};
	op[C.VALUE]=params;
	op[C.INSERT_TIME]=(new Date()).getTime();
	op[C.TYPE]=C.REQUEST;
	var name="log_"+_get_date();
	db[name].insert(op);
}})

