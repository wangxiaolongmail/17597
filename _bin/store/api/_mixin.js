db.system.js.save({_id:"_mixin",value:function () {
			for (var key in obj) { 
				if (obj.hasOwnProperty(key)) { 
					if (fn.call(context||obj[key], key, obj[key],i) === true) { 
						flag = true; 
						break; 
					} 
					i++; 
				} 
			} 

}})