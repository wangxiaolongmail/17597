db.system.js.save({_id:"_each",value:function (obj, fn , context ) {
		var flag = false; 
		if ( _is_array(obj) ) { 
			for (var i = 0, len = obj.length; i < len; i++) { 
				if (fn.call(context, i, obj[i],i,len) === true) { 
					flag = true; 
					break; 
				} 
			} 
		} else if( _is_object(obj) ){ 
			var i = 0; 
			for (var key in obj) { 
				if (obj.hasOwnProperty(key)) { 
					if (fn.call(context, key, obj[key],i) === true) { 
						flag = true; 
						break; 
					} 
					i++; 
				} 
			} 
		} else{
		}
		return flag; 
}})