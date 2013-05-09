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
dojo.provide("com.easysoft.service.Backup");
dojo.declare( "com.easysoft.service.Backup" , "com.easysoft.service.Service" , {
	templatePath:"com.easysoft.service.templates.Backup",
	postCreate:function(){
		var cmd = 'sh /opt/cluster/'+dojo.conf.port+'/_bakdb.sh';
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