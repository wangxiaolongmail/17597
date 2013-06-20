db.system.js.save({_id:"_get_mdata",value:function (mid) {
	var obj=db.memory.findOne({_id:mid});
	if(obj){
		return obj;
	}else{
		return null;
	}
}})

