db.system.js.save({_id:"public",value:function () {
        return {
                interval:20*60*1000,
                pageSize:10,
                isCache:false,
                metadata:{
                        favorite:[
                                {field:"_id",ishidden:true},
                                {field:"id",lable:"id"},
                                {field:"article_title",lable:"title"},
                                {field:"category",lable:"category"},
                                {field:"article_url",ishidden:true},
                        ]
                },
                i18n:function(key){
                        return ((db.i18n.findOne({_id:key})||{})["cn"])||key;
                }
        };
}})

