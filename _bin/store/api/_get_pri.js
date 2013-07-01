db.system.js.save({_id:"_get_pri",value:function (tn) {
	var C=constant();
	var a=db[tn].find().sort({PRI:-1}).limit(1).toArray();
   	var wrap={};
	if(a.length>0){
		var i=a[0][C.PRI];
		wrap[tn]=isNaN(i)?1:i;
	}else{
		wrap[tn]=1;
	}
	return wrap;
}})

