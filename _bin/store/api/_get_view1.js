db.system.js.save({_id:"_get_view1",value:function (params,sess) {
		var pub=public();
		var C=constant();
		var 
		tablename=params[C.TABLE_NAME],
		tablename_type=params[C.TABLE+C.TYPE];

		var a=[];
		_each(db[tablename_type].find().toArray(),function(k,v,i){
			var o=v;
			o.list=[];
			var op={};
			if(sess){
				op[C.CATEGORY]=o._id;
				op[C.USER_NAME]=sess[C.USER_NAME];
				_each(db[tablename].find( op ).toArray(),function(k,v,i){
					o.list.push(v);
				});
			}else{
				op[C.CATEGORY]=o._id;
				_each(db[tablename].find( op ).toArray(),function(k,v,i){
					if(!v[C.IS_HIDDEN]){
						o.list.push(v);
					}
				});
			}
			a.push(o);

		});

		return a;
}})
