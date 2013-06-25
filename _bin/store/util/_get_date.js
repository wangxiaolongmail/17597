db.system.js.save({_id:"_get_date",value:function () {
	var a = new Date();
	var _year=a.getFullYear();
	var _month=a.getMonth()+1;
	var _month=_month<=9?("0"+_month):(""+_month);
	var _date=a.getDate();
	var _date=_date<=9?("0"+_date):(""+_date);
	var s = _year+"_"+_month+"_"+_date;
	return s;
}})

