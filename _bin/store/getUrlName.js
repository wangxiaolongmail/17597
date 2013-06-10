db.system.js.save({_id:"getUrlName",value:function (name) {
	var C=constant();
	var op={};
	op[C.MODULE_NAME]=name;
	var o=db.module.findOne( op );
	if(o){
		return o[C.MODULE_URL];
	}else{
		return;
	}

}})

