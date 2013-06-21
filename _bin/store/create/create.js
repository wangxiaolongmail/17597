//db.eval("create()");
db.system.js.save({_id:"create",value:function () {
		create_i18n();
		create_role();
		create_user();
		create_module();
		create_authority();
		
		//var isCapped=db.log.isCapped();
		//db.memory.drop(); 
		//db.createCollection("memory",{capped:true,size:100000}); 
		//db.session.drop(); 
		//db.createCollection("session",{capped:true,size:100000}); 
		//db.runCommand({converToCapped:"memory",size:10000}); 
}})

