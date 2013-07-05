db.system.js.save({_id:"_get_module_list",value:function (role_name) {
		var pub=public();
		var C=constant();
		var op={};
		op[C.ROLE_NAME]=role_name;
		var cursor=db.authority.find(op);
		var a=[];
		while (cursor.hasNext()) {
			var item=cursor.next();
			a.push(item);
		}
		return a;
}})
