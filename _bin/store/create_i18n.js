db.system.js.save({_id:"create_i18n",value:function () {
	var C=constant();
	db.i18n.remove();
	db.i18n.insert({_id:C.ALL,cn:"全部"});
	db.i18n.insert({_id:C.ADD,cn:"新增"});
	db.i18n.insert({_id:C.TITLE,cn:"标题"});
	db.i18n.insert({_id:C.CATEGORY,cn:"类别"});
	db.i18n.insert({_id:C.DELETE,cn:"删除"});
	db.i18n.insert({_id:C.EDIT,cn:"编辑"});
	db.i18n.insert({_id:C.FAVORITE,cn:"收藏夹"});
	db.i18n.insert({_id:C.USER_NAME,cn:"用户名"});
	db.i18n.insert({_id:C.PASSWORD,cn:"密码"});
	db.i18n.insert({_id:C.LOGIN,cn:"登录"});
	db.i18n.insert({_id:C.LOGOUT,cn:"退出"});
	db.i18n.insert({_id:C.SITE_NAME,cn:"17597.net"});
	db.i18n.insert({_id:C.OK,cn:"确定"});
	
	return db.i18n.find().toArray();
}})

