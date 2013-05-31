db.system.js.save({_id:"init_i18n",value:function () {
	var cst=constant();
	db.i18n.remove();
	db.i18n.insert({_id:cst.ALL,cn:"全部"});
	db.i18n.insert({_id:"title",cn:"标题"});
}})

