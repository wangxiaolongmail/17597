db.system.js.save({_id:"create_user",value:function (params) {
	var C=constant();
	db[C.USER].remove();
	var obj={};
	obj[C.ROLE_NAME]=C.ROLE+C.EASYSOFT;
	obj[C.USER_NAME]="admin";
	obj[C.PASSWORD]="abc46a3f98cf2915d8b7e0dfcf3642de";
	_insert(C.USER,obj);
}})
