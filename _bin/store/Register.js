db.system.js.save({_id:"Register",value:function(params){
		var C=constant();
		if(params.method=="get"){
			var op={};
			var o={};
			o[C.CHECK_CODE]=_create_check_code();
			op[C.MID]=_push_mdata(o);
			op.ok=true;
			return op;
		}else{
			var mdata=_remove_mdata(params[C.MID]);
			if(mdata[C.CHECK_CODE][C.VALUE]===params[C.INSERT+C.OBJECT][C.CHECK_CODE]){
				var o=params[C.INSERT+C.OBJECT];
				o[C.ROLE_NAME]=C.REGISTER;
				_insert(C.USER,o);
				return {ok:true};
			}else{
				return {ok:false,err:"check code error"};
			}
		}
	}
})


