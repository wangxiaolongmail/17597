db.system.js.save({_id:"_get_class",value:function (object) {
	return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
}})
