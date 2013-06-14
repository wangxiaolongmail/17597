db.system.js.save({_id:"_push_mdata",value:function (mdata) {
	var C=constant();
	var _id=ObjectId();
	var op={};
	op["_id"]=_id;
	op[C.VALUE]=mdata;
	op[C.INSERT_TIME]=(new Date()).getTime();
	db.memory.insert(op);
	return _id.valueOf();
}})

