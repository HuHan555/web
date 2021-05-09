export default{
	//首页message时间转换
	dateTime(d){
		let nowtime=new Date();
		let displaytime=new Date(d);
		//获取老时间的具体时间
		let disd=displaytime.getTime();
		let dish=displaytime.getHours();
		let dism=displaytime.getMinutes();
		let disY=displaytime.getFullYear();
		let disM=displaytime.getMonth()+1;
		let disD=displaytime.getDate()-2;
		//获取现在时间的具体时间
		let nowd=nowtime.getTime();
		let nowh=nowtime.getHours();
		let nowm=nowtime.getMinutes();
		let nowY=nowtime.getFullYear();
		let nowM=nowtime.getMonth()+1;
		let nowD=nowtime.getDate();
		
		if(disY===nowY && disM===nowM && disD===nowD){
			if(dish<10){
				dish='0'+dish;
			}
			if(dism<10){
				dism='0'+dism;
			}
			return dish+':'+dism;
		}
		
		if(disY===nowY && disM===nowM && disD+1===nowD){
			if(dish<10){
				dish='0'+dish;
			}
			if(dism<10){
				dism='0'+dism;
			}
			return "昨天"+dish+':'+dism;
		}else{
			return disY+'/'+disM+'/'+disD;
		}
	},
	//聊天时间
	dateTime1(d){
		let nowtime=new Date();
		let displaytime=new Date(d);
		//获取老时间的具体时间
		let disd=displaytime.getTime();
		let dish=displaytime.getHours();
		let dism=displaytime.getMinutes();
		let disY=displaytime.getFullYear();
		let disM=displaytime.getMonth()+1;
		let disD=displaytime.getDate();
		//获取现在时间的具体时间
		let nowd=nowtime.getTime();
		let nowh=nowtime.getHours();
		let nowm=nowtime.getMinutes();
		let nowY=nowtime.getFullYear();
		let nowM=nowtime.getMonth()+1;
		let nowD=nowtime.getDate();
		
		if(disY===nowY && disM===nowM && disD===nowD){
			if(dish<10){
				dish='0'+dish;
			}
			if(dism<10){
				dism='0'+dism;
			}
			return dish+':'+dism;
		}
		
		if(disY===nowY && disM===nowM && disD+1===nowD){
			if(dish<10){
				dish='0'+dish;
			}
			if(dism<10){
				dism='0'+dism;
			}
			return "昨天"+dish+':'+dism;
		}else if(disY===nowY){
			//本年
			if(dish<10){
				dish='0'+dish;
			}
			if(dism<10){
				dism='0'+dism;
			}
			return disM+'月'+disD+'日 '+dish+':'+dism;
		}else{
			//大于今年
			if(dish<10){
				dish='0'+dish;
			}
			if(dism<10){
				dism='0'+dism;
			}
			return disY+'年'+disM+'月'+disD+'日 '+dish+':'+dism;
		}
	},
	//间隔时间差
	spacTime(old,now){
		old=new Date(old);
		now=new Date(now);
		var told=old.getTime();
		var tnow=now.getTime();
		if(told>(tnow+1000*60*2)){
			return now;
		}else{
			return "";
		}
	},
	checkEmail :function (email){
			return RegExp(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/).test(email);
	},
	// chooseImage(){
	// 	let that=this
	// 	uni.chooseImage({
	// 		count: 1,
	// 		success:(res)=> {
	// 			// console.log(123)
	// 			that.tempFilePaths = res.tempFilePaths;
	// 			// console.log(that.tempFilePaths[0])
	// 			uni.uploadFile({
	// 				url: that.ip+'message/uploadimg',
	// 				fileType:"image",
	// 				Header:{
	// 					'content-Type':'multipart/form-data'
	// 				},
	// 				filePath: that.tempFilePaths[0],
	// 				name: 'file',
	// 				formData: {
	// 					phone: that.phone,
	// 					'user': 'test'
	// 				},
	// 				success: (uploadFileRes) => {
	// 					that.img=uploadFileRes.data
	// 					console.log(uploadFileRes);
	// 				}
	// 			});
	// 			// this.img=res.tempFilePaths[0]
	// 		}
	// 	})
	// },
}