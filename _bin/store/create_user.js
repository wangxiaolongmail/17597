db.system.js.save({_id:"create_user",value:function (params) {
	var C=constant();
	db.user.remove();
	var obj={};
	obj["_id"]="wxl";
	obj[C.GROUP_NAME]="gwxl";
	obj[C.USER_NAME]="wxl";
	obj[C.PASSWORD]="abc46a3f98cf2915d8b7e0dfcf3642de";
	db.user.insert(obj);
}})
