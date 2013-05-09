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
dojo.provide("com.easysoft.service.StopHttpServer");
dojo.declare( "com.easysoft.service.StopHttpServer" , "com.easysoft.service.Service" , {
	templatePath:"com.easysoft.service.templates.StopHttpServer",
	postCreate:function(){
		var cmd = 'sh /opt/cluster/'+dojo.conf.port+'/_stop.sh /'+dojo.conf.port+'';
		console.log("---------------------------------------------------------");
		console.log("Run: "+cmd);
		console.log("---------------------------------------------------------");
		dojo.child_process.exec( cmd , dojo.hitch(this,function( e, stdout, stderr ){ 
			if( !e ){  
				console.log( stdout );  
			}else{ 
				console.log( stderr );  
			}
		}));
	}
});