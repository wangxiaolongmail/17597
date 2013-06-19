db.system.js.save({_id:"_is_array",value:function (val) {
	if (!val) return false;
	return _get_class(val) === 'Array';
}})
