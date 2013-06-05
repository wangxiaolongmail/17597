db.system.js.save({_id:"create_authority",value:function (params) {
	var C=constant();
	db.authority.remove();
	var obj={};
	obj[C.MODULE_NAME]=C.FAVORITE;
	obj[C.ROLE_NAME]="r_wxl";
	db.authority.insert(obj);
}})

