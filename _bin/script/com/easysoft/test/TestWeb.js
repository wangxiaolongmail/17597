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
 * Widget widget.
 * 
 * @author wxlwang
 */
dojo.provide("com.easysoft.test.TestWeb"); 
dojo.declare("com.easysoft.test.TestWeb" , "com.easysoft.Widget" , {
	m_port:80,
	create:function(){
		this.startTest();
	},
	startTest:function(){
		setTimeout( dojo.hitch(this,this.onTest) , dojo.conf.INTERVAL_TIME );
	},
	onTest:function(){
		var uri=dojo.conf.default_vm_ip;
		dojo.requestHttp({
			uri:uri,
			onLoad:dojo.hitch(this,function(err,response){
				if(response.statusCode!=$c.httpStatusCode200){
					var cmd = 'sh ../'+this.m_port+'/_restart.sh ';
					console.log("---------------------------------------------------------");
					console.log("Ping: "+uri);
					console.log("Run: "+cmd);
					console.log("---------------------------------------------------------");
					dojo.child_process.exec( cmd , dojo.hitch(this,function( e, stdout, stderr ){ 
						if( !e ){  
							console.log( stdout );  
						}else{ 
							console.log( stderr );  
						}
						setTimeout( dojo.hitch(this,this.onTest) , dojo.conf.INTERVAL_TIME );
					}));
				}else{
					this.startTest();
				}
			})
		});
	}
}); 