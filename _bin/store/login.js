//db.eval("create()");
db.system.js.save({_id:"create",value:function () {
		create_metadata();
		create_i18n();
		create_role();
		create_user();
		create_module();
		create_authority();
}})


