db.system.js.save({_id:"_is_object",value:function (val) {
	if (!val) return false;
	return _get_class(val) === 'Object';
}})