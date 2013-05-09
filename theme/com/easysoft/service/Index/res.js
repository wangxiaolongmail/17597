	;(function(){
		var g_sug_wrap=dojo.get("sug-wrap"),
		m_bd_form_input=dojo.get("bd_form_input"),
		m_bd_get_res=dojo.get("bd_get_res"),
		m_sel_i=0,
		m_sel_len=0,
		m_sel_buf=[],
		m_bd_form=dojo.get("js_sug-form1");
		m_url_list=[
			"http://www.baidu.com/s",
			"http://music.baidu.com/search",
			"http://video.baidu.com/v",
			"http://image.baidu.com/i",
			"http://tieba.baidu.com/f",
			"http://zhidao.baidu.com/q",
			"http://news.baidu.com/ns",
			"http://map.baidu.com/m"
		],
		m_list_tab=dojo.getArray('js_tab','a');
		;function runfn(_i){
			dojo.setCls(m_list_tab);
			dojo.setCls([m_list_tab[_i]],"cur");
			var oDiv=dojo.get("box-searcg");
			oDiv.className="box-search_base box-search_"+_i;
			m_bd_form.action=m_url_list[_i];
		}
		dojo.win.baidu={};
		dojo.win.baidu.sug=function(o){
			m_sel_buf=[];
			m_sel_i=0;
			var a=o.s;
			var buf=[];
			m_sel_len=a.length;
			m_sel_buf.push(o.q);
			dojo.each(a,function(i,v){
				buf.push("<div  class='sug-select'>");
				buf.push("<span class='sug-query'>");
				buf.push(o.q);
				buf.push("</span>");
				buf.push(v.substring(o.q.length));
				buf.push("</div>");
				m_sel_buf.push(v);
			});
			g_sug_wrap.innerHTML=buf.join("");
			g_sug_wrap.className="sug-wrap";
		}
		;function setInputValue(target){
			if( dojo.isString(target) ){
				m_bd_form_input.value=target;
			}else{
				m_bd_form_input.value=target.innerHTML.replace(/<.*?>/g,"");
			}
		};
		;function upmyClass(isUp){
			if(isUp){
				if(m_sel_i>0){
					m_sel_i--;
				}else{
					m_sel_i=m_sel_len;
				}
			}else{
				if(m_sel_i<m_sel_len){
					m_sel_i++;
				}else{
					m_sel_i=0;
				}
			}
			var a=dojo.getArray(g_sug_wrap,"div");
			var found=true;
			dojo.each(a,function(i,v){
				if(m_sel_i==(i+1)){
					v.className="sug-select selected";
					setInputValue(m_sel_buf[m_sel_i]);
					found=false;
				}else{
					v.className="sug-select";
				}
			});
			if(found){
				setInputValue(m_sel_buf[0]);
			}
		}
		;function hideContextMenu(e){
			var target=dojo.getTarget(e);
			if(target!=m_bd_form_input){
				g_sug_wrap.className="sug-wrap hide";
			}
		}
		;function getContextUrl(){
			return "http://suggestion.baidu.com/su?wd="+m_bd_form_input.value+"&sc=17597&t=1351832359089";
		}
		;function getDiv(){
			return dojo.getArray(g_sug_wrap,"div");
		}
		;function initPageEvent(){
			dojo.each(m_list_tab,function(i,v){
				dojo.bind(v,"click",(function(){
					var _i=i;
					return function(){
						runfn(_i);
					};
				})());
			});
			dojo.bind(m_bd_form_input,"keyup",function(e){
				if ( e.keyCode == 38 ) {
					upmyClass(true);
				}else if(e.keyCode == 40 ){
					upmyClass(false);
				}else{
					m_bd_get_res.innerHTML="";
					m_bd_get_res.appendChild(dojo.create("script",{src:getContextUrl()}));
				}
				dojo.stopBubble(e);
			});
			dojo.bind(g_sug_wrap,"click",function(e){
				var t=dojo.getTarget(e);
				dojo.each(getDiv(),function(i,v){
					if(t==v){
						setInputValue(t);
						m_bd_form.submit();
					}
				});
			});
			dojo.bind(g_sug_wrap,"mousemove",function(e){
				dojo.setCls(getDiv(),"sug-select");
			});
			dojo.bind(dojo.getBody(),"click",hideContextMenu);
		}
		initPageEvent();
		runfn(0);
	})();