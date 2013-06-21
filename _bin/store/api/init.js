db.system.js.save({_id:"init",value:function () {
	var pub=public();
	var C=constant();
	
    var result={
		C:C,
		metadata:_get_metadata()
    };
		
	var a=db.favorite_type.find({},{article_title:true,category:true}).toArray();
	var favorite_type={};
	_each(a,function(k,v,i){
		favorite_type[v.category]=v.article_title;
	});
	result[C.FAVORITE_TYPE]=favorite_type;
	var dict={};
	var favorite_type={};
	_each(a,function(k,v,i){
		favorite_type[v._id.valueOf()]=v.article_title;
	});
	dict[C.FAVORITE_TYPE]=favorite_type;
	
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
	result[C.ROLE]=_get_role();
	result[C._ID]=C.APPLICATION;
	result[C.DICT]=dict;
	_push_mdata(result)
	return result;
}})

