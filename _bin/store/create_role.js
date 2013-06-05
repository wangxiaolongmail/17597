db.system.js.save({_id:"create_role",value:function () {
		var C=constant();
		db.role.remove();
		var obj={};
		obj["_id"]="role_wxl";
		obj[C.ROLE_NAME]="role_wxl";
		db.role.insert(obj);
}})

