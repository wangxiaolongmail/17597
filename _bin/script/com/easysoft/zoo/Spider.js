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
dojo.provide("com.easysoft.zoo.Spider");
dojo.declare( "com.easysoft.zoo.Spider" , "" , {
	isCache:true,
	dir:null,
	create:function(){
		this.spinWebSync(this.dir);
	},
	spinWebSync : function( dir ){
		if(!dir) return;
		var hash={};
		this._spinWebSync( dir , hash , true );
		this.m_hash=hash;
	},
	getMap:function(){
		return this.m_hash;
	},
	getItem	: function( pathname ){
		if(pathname[0]==="/") pathname = pathname.substring(1);
		return dojo.getProp( pathname.split("/"), false, this.m_hash );
	},
	readCacheSync: function( item ){
		if( item.isFile ){
			var buf="";
			if( this.isCache&&item.cache ){
				var buf=item.cache;
			}else{
				var buf=dojo.fs.readFileSync( item.path , item.encoding );
				if(this.isCache){ 
					item.cache = buf;
				}
			}
			return buf;
		}else{
			return "";
		}
	},
	_spinWebSync:function( dir , hash , isDg ){
		var a= dojo.fs.readdirSync(dir);
		dojo.each(a,function(k,v,i){
			var item = v; 
			if(dojo.isSafeFile(v)) return;
			var new_dir = dir + "/" + item;
			var state = dojo.fs.statSync(new_dir);
			var isDir = state.isDirectory();
			var child = {isDir : isDir, isFile : !isDir, path : new_dir };
			if( isDir ){
				if(isDg){
					this._spinWebSync( new_dir , child , isDg ); 
					hash[item] = child;
				}
			}else{
				var extname  = dojo.path.extname(item);
				if( dojo.hasArray(dojo.all_extname.split("|"),extname) ){
					child.encoding = dojo.getEncodingByExtname(extname);
					child.contentType= dojo.getContentTypeByExtname(extname);
					child.extname = extname;
					hash[item] = child;
				}
			}
		},this);
	}
});