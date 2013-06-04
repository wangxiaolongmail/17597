db.system.js.save({_id:"create_usergroup",value:function () {
		var C=constant();
		db.usergroup.remove();
		var obj={};
		obj["_id"]="gwxl";
		obj[C.GROUP_NAME]="gwxl";
		db.usergroup.insert(obj);
}})

