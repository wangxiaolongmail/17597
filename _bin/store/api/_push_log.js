db.system.js.save({_id:"_push_log",value:function (params) {
	var C=constant();
	var op={};
	op[C.VALUE]=params;
	op[C.INSERT_TIME]=(new Date()).getTime();
	db.log.insert(op);
}})

