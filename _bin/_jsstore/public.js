db.system.js.save({_id:"public",value:function () {
        return {
                interval:20*60*1000,
                pageSize:10,
                isCache:false,
                metadata:function(key){
			return db.metadata.findOne({_id:key})["value"];
		},
                i18n:function(key){
                        return ((db.i18n.findOne({_id:key})||{})["cn"])||key;
                }
        };
}})

