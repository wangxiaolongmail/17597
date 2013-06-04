db.system.js.save({_id:"create_authority",value:function (params) {
	var C=constant();
	db.authority.remove();
	var obj={};
	obj[C.MODULE_NAME]=C.FAVORITE;
	obj[C.GROUP_NAME]="gwxl";
	db.authority.insert(obj);
}})

