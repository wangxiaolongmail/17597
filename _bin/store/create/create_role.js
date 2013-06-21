db.system.js.save({_id:"create_role",value:function () {
		var C=constant();
		db.role.remove();
		var obj={};
		obj[C.ROLE_NAME]=C.ROLE+C.EASYSOFT;
		obj[C.IS_GUEST]=false;
		obj[C.IS_DEBUG]=true;
		db.role.insert(obj);
		var obj={};
		obj[C.ROLE_NAME]=C.ROLE+C.PUBLIC;
		obj[C.IS_GUEST]=true;
		obj[C.IS_DEBUG]=false;
		db.role.insert(obj);

}})

