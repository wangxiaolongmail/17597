db.system.js.save({_id:"admin_create_user",value:function (params) {
	var C=constant();
	var obj={};
	obj[C.USER_NAME]="wxl";
	obj[C.PASSWORD]="abc46a3f98cf2915d8b7e0dfcf3642de";
	db.user.remove();
	db.user.insert(obj);
}})
