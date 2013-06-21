db.system.js.save({_id:"_push_mdata",value:function (mdata) {
	if(!mdata._id){
		mdata._id=ObjectId().valueOf();
	}
	db.memory.save(mdata);
	return mdata._id;
}})

