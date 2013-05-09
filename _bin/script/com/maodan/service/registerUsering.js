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
dojo.provide("com.maodan.service.registerUsering");
dojo.declare( "com.maodan.service.registerUsering" , "com.easysoft.service.Service" , {
	templatePath:"com.maodan.service.templates.registerUsering",
	create:function(){
		this.attachSession(); 
		this.postMixInProperties();
		this.attachTemplate();
		this.buildRendering();
		this.postCreate();
		var path="/_d/maodan/table/register_user";
		var regusername=this.queryForm[$c.c_regusername];
		/*
		var s="<div>\n";
		s+="<div class='"+$c.c_article_title+"'>\n"+regusername+"\n</div>\n";
		s+="<div class='regusername'>\n"+regusername+"\n</div>\n";
		s+="</div>\n";
		console.log(s);
		var buf = new Buffer(s, 'utf8');
		//var buf_str=new dojo.buffer.Buffer(s, 'ascii');
		var s1=buf.toString('utf-8');
		console.log(s1);
		*/
		
		var s='<div> <div class="'+$c.c_article_title+'"> '+regusername+' </div> <div class="regusername"> '+regusername+' </div> </div>';
		dojo.createWebFolder($c.c_widget_util_addWebFolder,{
			path:path,
			fn:dojo.hitch(this,function( err , data ){
				if(err){
					this.echo404();
				}else{
					dojo.createWebFolder($c.c_widget_util_writeWebFolder,{
						data:s,
						path:data,
						fn:dojo.hitch(this,function(err){
							if(err){
								this.echo404(err); 
							}else{
								var o = dojo.atm([$c.c_cache,this.template,$c.c_Last_Modified,dojo.getTimestamp()]);
								this.dog.echoLast(o);
							}
						})
					});
				}
			})}
		);
	}
});