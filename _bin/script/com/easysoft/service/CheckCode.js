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
		var a=[],C=dojo.C,op={};
		var op=this.getbo();
		op.mid =this.queryString.mid||"";
		op[C.STORED_METHOD] ='get_check_code';
		this.exec(op);
	},
	postDraw:function(data){
		var w=data.w;
		var h=data.h
		var canvas = new dojo.canvas(w, h),
		ctx = canvas.getContext('2d');

		ctx.fillStyle = data.bgColor;
		ctx.fillRect(0, 0, w, h);
		ctx.font = data.font;

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