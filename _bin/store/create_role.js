db.system.js.save({_id:"create_role",value:function () {
		var C=constant();
		db.role.remove();
		var obj={};
		obj["_id"]="r_wxl";
		obj[C.ROLE_NAME]="r_wxl";
		db.role.insert(obj);
}})

