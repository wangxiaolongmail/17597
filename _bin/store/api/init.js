db.system.js.save({_id:"init",value:function () {
	var pub=public();
	var C=constant();
	favorite_catlist=db.favorite_type.find({},{article_title:true,category:true}).toArray();
	
	var favorite_type={};
	var a=favorite_catlist;
	for(var i=0;i<a.length;i++){
		favorite_type[a[i].category]=a[i].article_title;
	}
        var result={
		C:C,
		metadata:_get_metadata()
        };
	var I18N={};
	var a=db.i18n.find().toArray()
	for(var i=0;i<a.length;i++){
		var o=a[i];
		I18N[o._id]=o.cn;
	}
	result[C.I18N]=I18N;
	result[C.FAVORITE_TYPE]=favorite_type;
	var dynamicServletMapping=[];
	var a=db.module.find().toArray()
	for(var i=0;i<a.length;i++){
		var o=a[i];
		var op={};
		op[C.SERVLET_CLASS]=o[C.SERVLET_CLASS];
		op[C.PATH_NAME]=o[C.MODULE_URL];
		op[C.METHOD]=o[C.METHOD];
		dynamicServletMapping.push(op);	
	}
	result.isClientDebug=pub.isClientDebug;
	result.isAdminClientDebug=pub.isAdminClientDebug;
	result["dynamicServletMapping"]=dynamicServletMapping;
	result[C.ROLE]=_get_role();
	result[C._ID]=C.APPLICATION;
	_push_mdata(result)
	return result;
}})

