/**
 * [获取随机验证码]
 * @param  {[Number]} num [验证码位数]
 * @return {String}     [验证码]
 */
function yanzhengma(num){
	if(num === undefined){
		num = 4;
	}
	var arr = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');

	// 循环获取验证码
	var res = '';
	for(var i=0;i<num;i++){
		var idx = parseInt(Math.random()*arr.length);
		res += arr[idx];
	}
	return res;
}

/**
 * [生成一个随机整数]
 * @param  {Number} min [最小值]
 * @param  {Number} max [最大值]
 * @return {Number}     [返回一个min~max之间的随机整数]
 */
function randomNumber(min,max){
	var res = parseInt(Math.random()*(max-min+1)) + min;

	return res
}

//randomNumber(10,50)

/**
 * [获取随机颜色]
 * @return {String} [颜色16进制]
 */
function randomColor(){
	var str = '6789abcdef';

	var res = '#';
	for(var i=0;i<6;i++){
		var idx = Math.floor(Math.random()*str.length);
		res += str[idx];
	}
	return res;
}
// randomColor();//'#ff0000'

/**
 * [过滤其他节点，得到元素节点]
 * @param  {Array} nodes [节点集合（类数组）]
 * @return {Array}       [返回元素节点集合]
 */
function getElement(nodes){
	var res = [];
	for(var i=0;i<nodes.length;i++){
		if(nodes[i].nodeType === 1){
			res.push(nodes[i]);
		}
	}

	return res;
}
// getElement(all_child);//[h4,ul,h4,ul]

function firstElementChild(parent){
	var res = getElement(parent.childNodes);
	return res[0];
}

function lastElementChild(parent){
	var res = getElement(parent.childNodes);
	return res[res.length-1];
}

function nextElement(ele){
	var res = ele.nextSibling;

	// 判断res是否为元素节点，并且不是最后一个元素
	while(res.nodeType !== 1 && res != ele.parentNode.lastChild){
		res = res.nextSibling;
	}

	return res;

}

function previousElement(ele){

}

function getElementsByClassName(className){
	//不用判断是否为ie8以下的浏览器
	//推荐：判断当前浏览器是否支持改方法
	if(document.getElementsByClassName){
		return document.getElementsByClassName(className);
	}

	//IE8以下浏览器
	//思路：利用getElementsByTagName('*')
	else{
		var res = [];
		var eles = document.getElementsByTagName('*');

		for(var i=0;i<eles.length;i++){
			if(eles[i].className.indexOf(className)>=0){
				res.push(eles[i]);
			}
		}

		return res;
	}
}

//getElementsByClassName('box');

/**
 * [获取css样式]
 * @param  {Element} ele  [获取样式的元素]
 * @param  {String} attr [css属性]
 * @return {String}      [返回attr对应css样式]
 */
function getStyle(ele,attr){
	var res = '';
	// 标准浏览器
	if(window.getComputedStyle){
		res = getComputedStyle(ele)[attr];
	}

	// ie8-
	else if(ele.currentStyle){
		res = ele.currentStyle[attr];
	}

	// 其他浏览器
	else{
		res = ele.style[attr];
	}

	return res;
}
// getStyle(box,'width');//600px


/**
 * [事件绑定方法，兼容所有浏览]
 * @param  {Element} ele     [需要绑定事件的元素]
 * @param  {String} type    [事件类型]
 * @param  {Function} handler [事件处理函数]
 * @param  {[Boolean]} capture [是否捕获，可选参数]
 */
function bind(ele,type,handler,capture){
	// 标准浏览器
	if(ele.addEventListener){
		ele.addEventListener(type,handler,capture);
	}

	// ie8-
	else if(ele.attachEvent){
		ele.attachEvent('on'+type,handler)
	}

	// 其他浏览器
	else{
		ele['on' + type] = handler;
	}
}

// bind(box,'click',function(){})


/*
	增：Cookie.set()
	删：Cookie.remove()
	查：Cookie.get()
	改：Cookie.set()
 */
var Cookie = {
	/**
	 * [获取cookie]
	 * @param  {String} name [cookie名]
	 * @return {String}      [cookie名对应的值]
	 */
	get:function(name){
		var res = '';
		var cookies = document.cookie;
		if(cookies.length>0){
			cookies = cookies.split('; ');
			cookies.forEach(function(cookie){
				var temp = cookie.split('=');
				if(temp[0] === name){
					res = temp[1];
				}
			})
		}
		return res;
	},

	/**
	 * [设置cookie]
	 * @param {String} name  [cookie名]
	 * @param {String} value [cookie值]
	 * @param {[Object]} opt   [cookie参数：exipres,path,domain]
	 */
	set:function(name,value,opt){
		var cookieStr = name + '=' + value;
		if(opt !== undefined){
			for(var attr in opt){
				cookieStr += ';'+attr + '=' + opt[attr]
			}
		}

		document.cookie = cookieStr;
	},

	// 删除cookie
	remove:function(name){
		var date = new Date();
		date.setDate(date.getDate()-10);
		// document.cookie = name + '=x;expires=' + date.toUTCString();
		this.set(name,'x',{expires:date.toUTCString()});
	}
}

// JSON.parse(Cookie.get('carlist'));//[{},{}]
// Cookie.set('carlist',val,{expires:date.toUTCString(),path:'/'});//[{},{}]
// Cookie.remove('carlist')


/**
 * [动画函数]
 * @param  {Element} ele    [动画元素]
 * @param  {String} attr   [css属性]
 * @param  {Number} target [动画目标值]
 */
/*function animate(ele,attr,target){
	// 为每个属性设置不同的定时器(关键1)
	let timerName = attr + 'timer';

	clearInterval(ele[timerName]);

	// 把定时器与Dom关联（关键2）
	ele[timerName] = setInterval(()=>{
		// 先获取当前值
		let current = getComputedStyle(ele)[attr];//String:100px,50rem,0.5,60deg

		// 提取数值：单位
		// 根据当前值提取单位(单位在current最后面)
		let unit = current.match(/[a-z]+$/);
		if(unit){
			current = current.substring(0,unit.index)*1;
			unit = unit[0]
		}else{
			unit = '';
			current *= 1;
		}

		// 计算速度
		let speed = (target - current)/10;

		// 处理speed值，防止speed为小数而造成定时器无法完成的情况
		// 0.3=>1,-0.3=>-1
		speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);


		if(attr === 'opacity'){
			speed = speed>0 ? 0.05 : -0.05;
		}

		if(current === target){
			clearInterval(ele[timerName]);
			current = target - speed;
		}

		ele.style[attr] = current + speed + unit;
	},30)
}*/

// animate(ele,'left',800);//把ele元素从初始位置移动到left:800的位置

/**
 * [运动函数]
 * @param  {Element} ele [需要动画的元素]
 * @param  {Object} opt [动画属性]
 */
function animate(ele,opt,callback){
	// 记录动画数量
	let timerLen = 0;

	// 遍历opt
	for(var attr in opt){
		// 如何把attr限定到局部作用域中
		// ES6解决方案：用let声明attr
		// 传统解决方案：利用函数传参

		createTimer(attr);

		timerLen++;
	}

	function createTimer(attr){
		// 为每个属性设置不同的定时器(关键1)
		let timerName = attr + 'timer';
		let target = opt[attr];

		clearInterval(ele[timerName]);

		// 把定时器与Dom关联（关键2）
		ele[timerName] = setInterval(()=>{
			// 先获取当前值
			let current = getComputedStyle(ele)[attr];//String:100px,50rem,0.5,60deg

			// 提取数值：单位
			// 根据当前值提取单位(单位在current最后面)
			let unit = current.match(/[a-z]+$/);
			if(unit){
				current = current.substring(0,unit.index)*1;
				unit = unit[0]
			}else{
				unit = '';
				current *= 1;
			}

			// 计算速度
			let speed = (target - current)/10;

			// 处理speed值，防止speed为小数而造成定时器无法完成的情况
			// 0.3=>1,-0.3=>-1
			speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);


			if(attr === 'opacity'){
				speed = speed>0 ? 0.05 : -0.05;
			}

			// 动画完成
			if(current === target){
				clearInterval(ele[timerName]);
				current = target - speed;

				timerLen--;

				if(typeof callback === 'function' && timerLen === 0){
					callback();
				}
			}

			ele.style[attr] = current + speed + unit;
		},30)
	}
	
}