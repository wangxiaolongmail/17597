/*
 *+--------------------------------------------------------------------------+
 *| Licensed Materials - Property of EasySoft 								 |
 *| (c) Copyright EasySoft Corporation 2011. All Rights Reserved. 			 |
 *| 																		 |
 *|  |
 *|  |
 *+--------------------------------------------------------------------------+
 */
/**
 * Index widget.
 * 
 * @author wxlwang
 */
dojo.provide("com.easysoft.service.admin.Exit");
dojo.declare( "com.easysoft.service.admin.Exit" , "com.easysoft.service.Redirect" , {
	redirect_url:$c.c_url_001_703,
	create:function(){
		console.log("--Exit--");
		var sid=this.queryString.sid;
		console.log(sid);
		this.echo();
		var self=this;
		dojo.db.collection('session',function(err,collection){
			var query_doc = {_id:dojo.mongodb.ObjectID(sid)};
			collection.update(query_doc,{'$set':{'isExit':true}});
			self.echo();
		});
	}
});