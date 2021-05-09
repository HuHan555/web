export default{
	ip:function(){
		return "http://127.0.0.1:8080/"
	},
	friends:function(){
		let friendarr=[
			{
				id:1,
				imgurl: "2.jpg",
				tip:2,
				name:'大海',
				time:new Date(),
				email:"dahai@163.com",
				information:"云阳龙缸国家地质公园是一个深550米的椭圆形天坑。缸内壁如削,缸底四季吐翠,因形状为一个天然大石缸,而得名龙缸,还流传樵夫与龙女爱情的美妙传说。"
			},
			{
				id:2,
				imgurl: "1.jpeg",
				tip:0,
				name:'山川',
				time:new Date(),
				email:"shanchuan@163.com",
				information:"因形状为一个天然大石缸,而得名龙缸,还流传樵夫与龙女爱情的美妙传说。"
			},
			{
				id:3,
				imgurl: "3.webp",
				tip:12,
				name:'江流',
				time:new Date(),
				email:"jiangliu@163.com",
				information:"缸内壁如削,缸底四季吐翠,因形状为一个天然大石缸,而得名龙缸,还流传樵夫与龙女爱情的美妙传说。"
			},{
				id:4,
				imgurl: "1.jpeg",
				tip:2,
				name:'小溪',
				time:new Date(),
				email:"xiaoxi@163.com",
				information:"云阳龙缸国家地质公园是一个深550米的椭圆形天坑。"
			}
		];
		return friendarr;
	},
	isFriend:function(){
		let isfriend=[
			{
				userid:1,
				friend:2,
			},
			{
				userid:1,
				friend:2,
			},
			{
				userid:1,
				friend:3,
			},

		];
		return isfriend;
	},
	message:function(){
		let msgs=[
			{
				id:'a',
				imgurl: "2.jpg",
				message: "旧梦依稀 往事迷离 春花秋月里 如雾里看花 水中望月 飘来又浮去",
				types: 0,//判断是否为图片
				time: new Date()-1000,
				tip: 0,
			},
			{
				id:'a',
				imgurl: "2.jpg",
				message: "君来有声 君去无语 翻云覆雨里",
				types: 0,
				time: new Date()-1000*16,
				tip: 1,
			},
			{
				id:'b',
				imgurl: "1.jpeg",
				message: "虽两情相惜 两心相仪 得来复失去",
				types: 0,
				time: new Date()-1000*60,
				tip: 2,
			},
			{
				id:'a',
				imgurl: "2.jpg",
				message: "有诗待和 有歌待应 有心待相系",
				types: 0,
				time: new Date()-1000*60*36,
				tip: 3,
			},
			{
				id:'a',
				imgurl: "2.jpg",
				message: "2.jpg",
				types: 1,
				time: new Date()-1000*60*40,
				tip: 4,
			},
			{
				id:'b',
				imgurl: "1.jpeg",
				message: "3.webp",
				types: 1,
				time: new Date()-1000*60*57,
				tip: 5,
			},
			{
				id:'a',
				imgurl: "2.jpg",
				message: "4.png",
				types: 1,
				time: new Date()-1000*60*58,
				tip: 6,
			},
			{
				id:'a',
				imgurl: "2.jpg",
				message: "旧梦依稀 往事迷离 春花秋月里 如雾里看花 水中望月 飘来又浮去",
				types: 0,
				time: new Date()-1000*60*60*23,
				tip: 7,
			},
			{
				id:'a',
				imgurl: "2.jpg",
				message: "君来有声 君去无语 翻云覆雨里",
				types: 0,
				time: new Date()-1000*60*60*24,
				tip: 8,
			},
			{
				id:'b',
				imgurl: "1.jpeg",
				message: "虽两情相惜 两心相仪 得来复失去",
				types: 0,
				time: new Date()-1000*60*60*36,
				tip: 9,
			},
			{
				id:'a',
				imgurl: "2.jpg",
				message: "有诗待和 有歌待应 有心待相系",
				types: 0,
				time: new Date()-1000*60*24*60*30,
				tip: 10,
			},
			{
				id:'a',
				imgurl: "2.jpg",
				message: "1.jpeg",
				types: 1,
				time: new Date()-1000*60*24*60*365,
				tip: 11,
			},
			{
				id:'b',
				imgurl: "1.jpeg",
				message: "logo.png",
				types: 1,
				time: new Date()-1000*60*24*60*365-1000*60,
				tip: 12,
			},
			{
				id:'a',
				imgurl: "2.jpg",
				message: "4.png",
				types: 1,
				time: new Date()-1000*60*24*60*366,
				tip: 13,
			},
		];
		return msgs;
	}
}