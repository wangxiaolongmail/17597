db.system.js.save({_id:"create_i18n",value:function () {
	var C=constant();
	db.i18n.remove();
	db.i18n.insert({_id:C._ID,cn:"ID"});
	db.i18n.insert({_id:C.ALL,cn:"全部"});
	db.i18n.insert({_id:C.ADD,cn:"新增"});
	db.i18n.insert({_id:C.CATEGORY,cn:"类别"});
	db.i18n.insert({_id:C.CHECK_CODE,cn:"验证码"});
	db.i18n.insert({_id:C.DELETE,cn:"删除"});
	db.i18n.insert({_id:C.DEPARTMENT,cn:"部门"});
	db.i18n.insert({_id:C.EDIT,cn:"编辑"});
	db.i18n.insert({_id:C.FAVORITE,cn:"收藏夹"});
	db.i18n.insert({_id:C.FAVORITE_TYPE,cn:"收藏夹分类"});
	db.i18n.insert({_id:C.LOGIN,cn:"登录"});
	db.i18n.insert({_id:C.LOGOUT,cn:"退出"});
	db.i18n.insert({_id:C.NAME,cn:"名称"});
	db.i18n.insert({_id:C.USER_NAME,cn:"用户名"});
	db.i18n.insert({_id:C.URL,cn:"网页地址"});
	db.i18n.insert({_id:C.OK,cn:"确定"});
	db.i18n.insert({_id:C.ORGANIZE,cn:"组织"});
	db.i18n.insert({_id:C.ORGANIZE_TYPE,cn:"组织分类"});
	db.i18n.insert({_id:C.PASSWORD,cn:"密码"});
	db.i18n.insert({_id:C.REGISTER,cn:"注册"});
	db.i18n.insert({_id:C.REPEAT,cn:"重复"});
	db.i18n.insert({_id:C.SITE_NAME,cn:"一起玩网"});
	db.i18n.insert({_id:C.TITLE,cn:"标题"});
	db.i18n.insert({_id:C.LOGIN,cn:"登录"});
	db.i18n.insert({_id:C.INDEX,cn:"主页"});
	db.i18n.insert({_id:C.START,cn:"开始"});
	return db.i18n.find().toArray();
}})

