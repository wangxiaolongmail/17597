db.system.js.save({_id:"init",value:function () {
	var pub=public();
	var C=constant();
	
    var result={
		C:C,
		Schema:_get_schema()
    };
	
	var dict=_get_dict(C.FAVORITE_TYPE);
	
	var I18N={};
	var a=db.i18n.find().toArray()
	_each(a,function(k,v,i){
		I18N[v._id]=v.cn;
	});
	result[C.I18N]=I18N;
	
	var dynamicServletMapping=[];
	var a=db.module.find().toArray();
	_each(a,function(k,v,i){
		var o=v;
		var op={};
		op[C.SERVLET_CLASS]=o[C.SERVLET_CLASS];
		op[C.PATH_NAME]=o[C.MODULE_URL];
		op[C.METHOD]=o[C.METHOD];
		dynamicServletMapping.push(op);	
	});
	result["dynamicServletMapping"]=dynamicServletMapping;
	var map={};
	_each(a,function(k,v,i){
		map[v[C.MODULE_NAME]]=v[C.MODULE_URL];
	});
	result[C.URL]=map;
	result[C.ROLE]=_get_role();
	result[C._ID]=C.APPLICATION;
	result[C.DICT]=dict;
	
	var op={};
	op[C.FAVORITE]=1;
	result[C.PRI]=op;

	_push_mdata(result);
	return result;
}})

