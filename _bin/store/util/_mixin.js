db.system.js.save({_id:"_mixin",value:function (t,s) {
	if( _is_object(t) && _is_object(s) ){
		_each(s,function(k,v,i){
			t[k]=v;
		});
	};
}})
