function(){
	var map=function(){
		emit( this.category , 1 );
	}
	var reduce=function(key,vals){
		var sum = 0;
		for(var i in vals) {
			sum += vals[i];
		}
		return sum;
	}
	var ret=db.favorite_type.mapReduce(map,reduce,{out:'tmp'});
	return ret;
}