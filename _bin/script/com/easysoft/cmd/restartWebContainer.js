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
dojo.provide("com.easysoft.cmd.restartWebContainer"); 
dojo.declare( "com.easysoft.cmd.restartWebContainer" , "com.easysoft.Widget" , { 
	create:function(){
		var path="/_bin/script/com/easysoft/result/linux_ps_result.txt";
		dojo.fs.readFile( dojo.dir+path , dojo.getEncodingByExtname(dojo.path.extname(path)) , dojo.hitch( this , function ( err , cache ) {
			console.log(cache);
		}));
		/*
		dojo.child_process.exec("ps -aux | grep _start.js", function(error, stdout, stderr){
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			if (error !== null) {
			  console.log('exec error: ' + error);
			}
		});
		*/ 
	}
}); 