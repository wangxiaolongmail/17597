db.system.js.save({_id:"get_view_favorite",value:function () {
       var o=db.view_favorite.findOne();
	   o.ok=true;
	   return o;
}})

