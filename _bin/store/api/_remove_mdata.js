db.system.js.save({_id:"_remove_mdata",value:function (mid) {
	var obj=_get_mdata(mid);
	db.memory.remove({_id:mid});
	return obj;
}})

