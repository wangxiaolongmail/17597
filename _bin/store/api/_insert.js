db.system.js.save({_id:"_insert",value:function (tablename,o) {
	var o=o||{};
	if(!o._id){
		o._id=ObjectId().valueOf();

	}
	db[tablename].insert(o);
}})
