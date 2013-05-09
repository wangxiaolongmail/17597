	;(function(){
		var d=dojo,map={};
		d.control.date=map;
		var m_divBody,m_divBodyMid;
		var m_divBodyTopTCenter;
		function getTime() {
			var now = new Date();
			var hour = now.getHours();
			var minute = now.getMinutes();
			now = null;
			var ampm = "";
			if (hour >= 12) {
			hour -= 12;
			ampm = "PM";
			} else
			ampm = "AM";
			hour = (hour == 0) ? 12 : hour;
			// add zero digit to a one digit minute
			if (minute < 10)
			minute = "0" + minute; // do not parse this number!
			// return time string
			return hour + ":" + minute + " " + ampm;
		}
		function leapYear(year) {
			if (year % 4 == 0)
				return true;
			return false;
		}
		function getDays(month, year) {
			var ar = new Array(12);
			ar[0] = 31; /* January */
			ar[1] = (leapYear(year)) ? 29 : 28; /* February */
			ar[2] = 31; /* March */
			ar[3] = 30; /* April */
			ar[4] = 31; /* May */
			ar[5] = 30; /* June */
			ar[6] = 31; /* July */
			ar[7] = 31; /* August */
			ar[8] = 30; /* September */
			ar[9] = 31; /* October */
			ar[10] = 30; /* November */
			ar[11] = 31; /* December */
			return ar[month];
		}
		function _init(){
			var a=dojo.getListClass("","TypeCtrlDate");
			dojo.each(a,function(k,v){
				_initEx(v);
			});
		}
		function _initEx(obj){
			var m_value=obj.value;
			obj.className="TypeCtrlDate hide";
			var div=dojo.create("div",{className:"ctlDate"});
			var divHead=dojo.create("div",{className:"ctlDateHead clearfix"});
				var divHeadLeft=dojo.create("div",{className:"ctlDateHeadLeft"});
					//var objInput=dojo.create("input",{value:m_value});
					var objInput=dojo.create("div",{className:"input"});
					objInput.innerHTML=m_value;
					divHeadLeft.appendChild(objInput);
				divHead.appendChild(divHeadLeft);
				var divHeadRight=dojo.create("div",{className:"ctlDateHeadRight"});
				divHead.appendChild(divHeadRight);
			div.appendChild(divHead);
			var divBody=dojo.create("div",{className:"ctlDateBody hide"});
				var divBodyTop=dojo.create("div",{className:"clearfix"});
					var divBodyTopTLeft=dojo.create("div",{className:"divBodyTopTLeft"});
					divBodyTopTLeft.innerHTML="<";
					divBodyTop.appendChild(divBodyTopTLeft);
					
					var divBodyTopTRight=dojo.create("div",{className:"divBodyTopTRight"});
					divBodyTopTRight.innerHTML=">";
					divBodyTop.appendChild(divBodyTopTRight);
					
					var divBodyTopTCenter=dojo.create("div",{className:"divBodyTopTCenter"});
					
					divBodyTop.appendChild(divBodyTopTCenter);
					m_divBodyTopTCenter=divBodyTopTCenter;
				
				var divBodyMid=dojo.create("div");
			divBody.appendChild(divBodyTop);
			divBody.appendChild(divBodyMid);
			m_divBodyMid=divBodyMid;
			m_divBody=divBody;
			div.appendChild(divBody);
			obj.parentNode.appendChild(div);
			
			dojo.bind(divHeadRight,"click",(function(){
				var _divBody=divBody;
				return function(){
					if(_divBody.className=="ctlDateBody"){
						_divBody.className="ctlDateBody hide";
					}else{
						_divBody.className="ctlDateBody";
					}
				};
			})());
			dojo.bind(dojo.getBody(),"click",(function(){
				var _divBody=divBody;
				return function(e){
					var target=dojo.getTarget(e);
					if(target!=divHeadRight){
						_divBody.className="ctlDateBody hide";
					}
				};
			})());
			dojo.bind(divBodyMid,"click",(function(){
				return function(e){
					var target=dojo.getTarget(e);
					var i = parseInt(target.innerHTML);
					if(isNaN(i)){
						dojo.stopBubble(e);
					}
				};
			})());
			dojo.bind(divBodyTopTLeft,"click",(function(){
				return function(e){
					dojo.stopBubble(e);
				};
			})());
			dojo.bind(divBodyTopTRight,"click",(function(){
				return function(e){
					dojo.stopBubble(e);
				};
			})());
			dojo.bind(divBodyTopTCenter,"click",(function(){
				return function(e){
					dojo.stopBubble(e);
				};
			})());
			setCal();
		}
		map.init=_init;
		
		function getMonthName(month) {
			var ar = new Array(12);
			ar[0] = "1";
			ar[1] = "2";
			ar[2] = "3";
			ar[3] = "4";
			ar[4] = "5";
			ar[5] = "6";
			ar[6] = "7";
			ar[7] = "8";
			ar[8] = "9";
			ar[9] = "10";
			ar[10] = "11";
			ar[11] = "12";
			return ar[month];
		}
		
		function setCal() {
			var now = new Date();
			var year = now.getFullYear();
			var month = now.getMonth();
			var monthName = getMonthName(month);
			var date = now.getDate();
			now = null;
			
			var firstDayInstance = new Date(year, month, 1);
			var firstDay = firstDayInstance.getDay();
			firstDayInstance = null;
			
			var days = getDays(month, year);
			drawCal(firstDay + 1, days, date, monthName, year);
		}
	function drawCal(firstDay, lastDate, date, monthName, year) {
		var headerHeight = 25; // height of the table's header cell
		var border = 1; // 3D height of table's border
		var cellspacing = 1; // width of table's border
		var headerColor = "#000000"; // color of table's header
		var headerSize = "4"; // size of tables header font
		var colWidth = 15; // width of columns in table
		var dayCellHeight = 12; // height of cells containing days of the week
		var dayColor = "000000"; // color of font representing week days
		var cellHeight = 20; // height of cells representing dates in the calendar
		var todayColor = "red"; // color specifying today's date in the calendar
		var timeColor = "black"; // color of font representing current time
		// create basic table structure
		var text = "" ;// initialize accumulative variable to empty string
		//text += '<CENTER>'
		text += '<TABLE width="100%" bgcolor=ffffff BORDER=' + border + ' CELLSPACING=' + cellspacing + '>' ;// table settings
		
		m_divBodyTopTCenter.innerHTML=monthName+" "+year +'';
		/*
		text += '<TH COLSPAN=7 bgcolor=cccccc HEIGHT=' + headerHeight + '>' // create table header cell
		text += '<FONT COLOR="' + headerColor + '" SIZE=' + headerSize + '>' // set font for table header
		text += year +'年'+monthName
		text += '</FONT>'
		//text += '<FONT COLOR="' + timeColor + '" >'
		text += getTime()
		
		//text += '</FONT>' // close table header's font settings
		text += '</TH>' // close header cell
		*/
		// variables to hold constant settings
		var openCol = '<TD WIDTH=' + colWidth + ' HEIGHT=' + dayCellHeight + '>';
		openCol += '<FONT COLOR="' + dayColor + '">';
		var closeCol = '</FONT></TD>';
		// create array of abbreviated day names
		var weekDay = new Array(7);
		weekDay[0] = "S";
		weekDay[1] = "M";
		weekDay[2] = "T";
		weekDay[3] = "W";
		weekDay[4] = "T";
		weekDay[5] = "F";
		weekDay[6] = "S";
		
		// create first row of table to set column width and specify week day
		text += '<TR ALIGN="center" VALIGN="center">';
		for (var dayNum = 0; dayNum < 7; ++dayNum) {
			text += openCol + weekDay[dayNum] + closeCol;
		}
		text += '</TR>';
		
		var digit = 1;
		var curCell = 1;
		
		for (var row = 1; row <= Math.ceil((lastDate + firstDay - 1) / 7); ++row) {
			text += '<TR ALIGN="right" VALIGN="top">';
			for (var col = 1; col <= 7; ++col) {
				if (digit > lastDate)
					break;
				if (curCell < firstDay) {
					text += '<TD></TD>';
					curCell++;
				} else {
					if (digit == date) {
						text += '<TD HEIGHT=' + cellHeight + '>';
						text += '<FONT COLOR="' + todayColor + '">';
						text += digit;
						text += '</FONT><BR>';
						text += '</TD>';
				} else
					text += '<TD HEIGHT=' + cellHeight + '>' + digit + '</TD>';
					digit++;
				}
			}
			text += '</TR>';
		}
		text += '</TABLE>';
		//text += '</CENTER>'
		m_divBodyMid.innerHTML=text;
	}
		
	})();