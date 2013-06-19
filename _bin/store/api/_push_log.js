db.system.js.save({_id:"_push_log",value:function (params) {
	var name="log_"+_get_date();
	db[name].insert(params);
}})

