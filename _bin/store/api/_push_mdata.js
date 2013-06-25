db.system.js.save({_id:"_push_mdata",value:function (mdata) {
	var mdata=mdata||{};
	if(!mdata._id){
		mdata._id=ObjectId().valueOf();
	}
	var C=constant();
	mdata[C.DATE]=_get_date();
	db.memory.save(mdata);
	return mdata._id;
}})

