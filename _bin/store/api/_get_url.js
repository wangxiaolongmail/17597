db.system.js.save({_id:"_get_url",value:function (name) {
	var C=constant();
	var op={};
	op[C.URL_NAME]=name;
	var o=db.module.findOne( op );
	if(o){
		return o[C.URL];
	}else{
		return;
	}

}})

