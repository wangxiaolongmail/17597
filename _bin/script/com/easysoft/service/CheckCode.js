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
dojo.provide("com.easysoft.service.CheckCode");
dojo.declare( "com.easysoft.service.CheckCode" , "com.easysoft.Widget" , {
	postCreate:function(){
		var a=[],I18N=dojo.i18n,C=dojo.cst,op={};
		op[C.STORED_METHOD] ='_get_check_code';
		this.exec(op);
	},
	postDraw:function(data){
		var canvas = new dojo.canvas(100, 30),
		ctx = canvas.getContext('2d');

		ctx.fillStyle = '#fff';
		ctx.fillRect(0, 0, 100, 30);
		ctx.font = 'bold 30px sans-serif';

		ctx.globalAlpha = .8;
		for (var i = 0; i < 4; i++) {
			ctx.fillStyle = data.b[i];
			ctx.fillText(data.a[i], 5 + i*23, 25);
		}
		var res = this.dog.res;
		canvas.toBuffer(function(err, buf){
			res.writeHead(200, { 'Content-Type': 'image/png', 'Content-Length': buf.length });
			res.end(buf);
		});
	},
	exec:function(op){
		var cmd = "main("+dojo.toString(op)+")";
		console.log('dojo.db.eval("'+cmd+'");');
		dojo.db.eval(cmd, dojo.hitch(this,this.draw));
	},
	draw:function(err,data){
		if(!err){
			if(data!=null){
				if(data.ok){
					this.postDraw(data);
				}else{
					this.endPaint(data.err);
				}
			}else{
				this.endPaint("database exec error");
			}
		}else{
			this.endPaint(dojo.toString(err));
		}
	}
});