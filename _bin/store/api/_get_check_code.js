db.system.js.save({_id:"_get_check_code",value:function () {
		items = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPRSTUVWXYZ23456789'.split(''),
		vcode = '',
		textColors = ['#FD0', '#6c0', '#09F', '#f30', '#aaa', '#3cc', '#cc0', '#A020F0', '#FFA500', '#A52A2A', '#8B6914', '#FFC0CB', '#90EE90'];
		
		var a=[];
		var b=[];
		for (var i = 0; i < 4; i++) {
			var rnd = Math.random();
			var item = Math.round(rnd * (items.length - 1));
			var color = Math.round(rnd * (textColors.length - 1));
			a.push(items[item]);
			b.push(textColors[color])
		}
		var o={};
		o.a=a;
		o.b=b;
		o.w=100;
		o.h=30;
		o.bgColor='#fff';
		o.font='bold 30px sans-serif';
		o.globalAlpha = .8;
		o.ok=true;
		return o;
}})

