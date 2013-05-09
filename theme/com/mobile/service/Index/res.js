	;(function(){
		var lt7="dojoxGridMasterView";
		var lt72="dojoxGridMasterView dojoxGridRowOver";
		var m_a=dojo.getListClass("","dojoxGridMasterView");
		dojo.each( m_a , function(i,v){
			dojo.bind(v,"mouseover",(function(){
				var _i=i;
				return function(){
					dojo.setCls(m_a,lt7);
					dojo.setCls([m_a[_i]],lt72);
				};
			})());
			dojo.bind(v,"mouseout",(function(){
				var _i=i;
				return function(){
					dojo.setCls(m_a,lt7);
				};
			})());
		});
		dojo.control.date.init();
	})();