db.system.js.save({_id:"_get_mdata",value:function (mid) {
	var C=constant();
	var op={_id:ObjectId(mid)};
	var rs=db.memory.findOne(op);
	if(rs){
		return rs[C.VALUE];
	}else{
		return {};
	}
}})

