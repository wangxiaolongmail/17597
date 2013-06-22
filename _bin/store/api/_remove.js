db.system.js.save({_id:"_remove",value:function (tablename,o) {
	var o=o||{};
	if(o._id){
		db[tablename].remove({_id:o._id});
	}
}})
