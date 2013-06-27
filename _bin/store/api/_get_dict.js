db.system.js.save({_id:"_get_dict",value:function (tn) {
	var C=constant();
	var a=db[tn].find().toArray();
   	var wrap={};
	var o={};
	_each(a,function(k,v,i){
		o[v._id.valueOf()]=v[C.NAME];
	});
	wrap[tn]=o;
	return wrap;
}})

