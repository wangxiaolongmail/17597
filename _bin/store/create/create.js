//db.eval("create()");
db.system.js.save({_id:"create",value:function () {
		create_i18n();
		create_role();
		create_user();
		create_module();
		create_authority();
		
		//var isCapped=db.log.isCapped();
		db.log.drop(); 
		db.createCollection("log",{capped:true,size:100000}); 
		//db.runCommand({converToCapped:"log",size:10000}); 
}})

