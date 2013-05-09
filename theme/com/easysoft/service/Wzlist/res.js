;(function(){
	var m_bd=dojo.get("bd"),
	m_res=dojo.get("res"),
	lt7="show-link-bg-lt7";
	var m_a_list=dojo.getArray( m_bd , 'a' ),
	m_li_list=dojo.getArray( m_bd , 'li' );
	(function(){
		dojo.setCls([m_res],"hide");
		dojo.each( m_a_list , function(i,v){
			dojo.bind(v,"mouseover",(function(){
				var _i=i;
				return function(){
					dojo.setCls(m_li_list);
					dojo.setCls([m_li_list[_i]],lt7);
				};
			})());
		});
		dojo.each( m_a_list , function(i,v){
			dojo.bind(v,"mouseout",(function(){
				var _i=i;
				return function(){
					dojo.setCls(m_li_list);
				};
			})());
		});
	})();
})();