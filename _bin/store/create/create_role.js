db.system.js.save({_id:"create_role",value:function () {
		var C=constant();
		db.role.remove();
		var obj={};
		obj["_id"]="r_wxl";
		obj[C.ROLE_NAME]="r_wxl";
		obj[C.IS_GUEST]=false;
		db.role.insert(obj);
		var obj={};
		obj["_id"]="r_easysoft";
		obj[C.ROLE_NAME]="r_easysoft";
		obj[C.IS_GUEST]=true;
		db.role.insert(obj);

}})

