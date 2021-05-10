<template>
	<view class="content">
		<view class="top-bar">
			<view class="search-div">
				<image src="../../static/imgs/search.jpg" class="search-img"></image>
				<input type="search" value="" placeholder="搜索用户" class="search" placeholder-style="color:#aaa;font-weight:400" @input="search"/>
			</view>
			<view class="top-bar-right">
				<view class="text" @click="BackOne">取消</view>
			</view>
		</view>
		<view class="main">
			<view class="search-user result" >
				<view class="title" v-if="userarr.length>0">用户</view>
				
				<view class="list user" v-for="(item,index) in userarr" :key="index">
					
					<view @click="gouserhome(item.phone,item.tip)" >
						<image :src="item.imgurl" mode=""></image>
					</view>
					<view class="names">
						<view class="name" v-html="item.phone"></view>
						<view class="email" v-html="item.email"></view>
					</view>
					<view class="right-button send" v-if="item.tip==1" @click="gochatroom(item.phone,item.imgurl)">发消息</view>
					<view class="right-button add" v-if="item.tip==0" @click="sendapply(item.phone)">加好友</view>
				</view>
				<view class="title" v-if="grouparr.length>0">群</view>
				
				<view class="list user" v-for="(item,index) in grouparr" :key="index">
					
					<view @click="gouserhome(item.phone,item.tip)" >
						<image :src="item.groupimg" mode=""></image>
					</view>
					<view class="names">
						<view class="name" v-html="item.groupname"></view>
						<view class="email" v-html="item.createphone"></view>
					</view>
					<view class="right-button send" @click="sendgroupapply(item.createphone)">加入群</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import datas from "../../commons/js/datas.js"
	export default {
		data() {
			return {
				userarr:[],
				Arr:[],
				ip:'',
				phone:'',
				groupid:'',
				grouparr:[],
			};
		},
		onLoad() {
			this.ip=datas.ip()
			let user=uni.getStorageSync("user")
			this.phone=user.phone
			this.groupid=user.groupid
			let that=this
			uni.request({
				url:that.ip+'search/friends',
				data:{
					phone:that.phone,
				},
				success:(res)=>{
					that.Arr=res.data
					console.log(that.Arr)
				}
			})
		},
		methods:{
			gochatroom:function(e,num){
				let exp=eval("/"+"<span style='color:#4AAAFF;'>"+"/g");
					let exp1=eval("/"+"\\<\\/span\\>"+"/g");
					// let reg=/<span style='color:#4AAAFF;'>/
					e=e.replace(exp,'')
					e=e.replace(exp1,'')
				uni.navigateTo({
					url:"../chatroom/chatroom?chatphone="+e+"&chatimg="+num
				})
			},
			gouserhome:function(e,num){
				let exp=eval("/"+"<span style='color:#4AAAFF;'>"+"/g");
					let exp1=eval("/"+"\\<\\/span\\>"+"/g");
					// let reg=/<span style='color:#4AAAFF;'>/
					e=e.replace(exp,'')
					e=e.replace(exp1,'')
				//如果不是好友，tip==0
				if(num==0){
					let urlphone="../userhome/userhome?phone="+e
					uni.navigateTo({
						url:urlphone,
					})
				}else{
					//是好友跳转到self页面
					let urlphone="../userhome/selfuserhome?phone="+e
					uni.navigateTo({
						url:urlphone,
					})
				}
				
				
			},
			sendapply:function(e){
				// console.log(e)
				let exp=eval("/"+"<span style='color:#4AAAFF;'>"+"/g");
				let exp1=eval("/"+"\\<\\/span\\>"+"/g");
				// let reg=/<span style='color:#4AAAFF;'>/
				e=e.replace(exp,'')
				e=e.replace(exp1,'')
				
				
				let that=this
				uni.request({
					url:that.ip+'search/sendapply',
					data:{
						sendphone:this.phone,
						recphone:e,
						sendtime:new Date(),
						isvalid:"1",
						isgroup:'0'
					},
					method:"POST",
					success:(res)=>{
						if(res.data==true){
							uni.showToast({
							title: '发送成功'
							});
						}
						
					}
				})
			},
			sendgroupapply:function(e){
				// console.log(e)
				let exp=eval("/"+"<span style='color:#4AAAFF;'>"+"/g");
				let exp1=eval("/"+"\\<\\/span\\>"+"/g");
				// let reg=/<span style='color:#4AAAFF;'>/
				e=e.replace(exp,'')
				e=e.replace(exp1,'')
				console.log(e)
				
				let that=this
				uni.request({
					url:that.ip+'search/sendgroupapply',
					data:{
						sendphone:this.phone,
						recphone:e,
						sendtime:new Date(),
						isvalid:"1",
						isgroup:'1',
					},
					method:"POST",
					success:(res)=>{
						if(res.data==true){
							uni.showToast({
							title: '发送成功'
							});
						}
						
					}
				})
			},
			BackOne(){
				uni.navigateBack({
					delta:1,
				})
			},
			//获取关键词
			search:function (e) {
				// console.log(e)
				this.userarr=[];
				this.grouparr=[]
				let searchval=e.detail.value;
				if(searchval.length>0){
					//如果输入的字符大于0
					this.searchUser(searchval);
					//如果该用户已经有群
					if(this.groupid==null){
						this.searchgroup(searchval)
					}
				}
			},
			//寻找关键词匹配的用户
			searchUser:function(e){
				// let arr=datas.friends();//模拟数据
				
				let that=this
				uni.request({
					url:that.ip+'search/All',
					method:"POST",
					dataType:'json',
					success:(res)=>{
						let arr1=res.data
						console.log(arr1)
						let exp=eval("/"+e+"/g");
						for(let i=0;i<arr1.length;i++){
							arr1[i].imgurl=that.ip+arr1[i].imgurl
							if(arr1[i].phone.search(e)!=-1 || arr1[i].email.search(e)!=-1){
								if(that.phone!=arr1[i].phone){
									this.isFri(arr1[i]);//判断是否为好友
								}
								arr1[i].phone=arr1[i].phone.replace(exp,"<span style='color:#4AAAFF;'>"+e+"</span>");
								arr1[i].email=arr1[i].email.replace(exp,"<span style='color:#4AAAFF;'>"+e+"</span>");
								that.userarr.push(arr1[i]);
							}
						}
						// console.log(this.userarr)
					}
				})
				
			},
			// 寻找匹配的群
			searchgroup:function(e){
				// let arr=datas.friends();//模拟数据
				
				let that=this
				uni.request({
					url:that.ip+'search/group',
					method:"POST",
					dataType:'json',
					success:(res)=>{
						let arr1=res.data
						
						let exp=eval("/"+e+"/g");
						for(let i=0;i<arr1.length;i++){
							arr1[i].imgurl=that.ip+arr1[i].imgurl
							if(arr1[i].groupname.search(e)!=-1 || arr1[i].createphone.search(e)!=-1){
								
								arr1[i].groupname=arr1[i].groupname.replace(exp,"<span style='color:#4AAAFF;'>"+e+"</span>");
								arr1[i].createphone=arr1[i].createphone.replace(exp,"<span style='color:#4AAAFF;'>"+e+"</span>");
								that.grouparr.push(arr1[i]);
							}
						}
						console.log(that.grouparr)
					}
				})
				
			},
			//判断是否是好友
			isFri:function(e){
				let tip=0;
				for(let i=0;i<this.Arr.length;i++){
					if(this.Arr[i]==e.phone){
						tip=1;
					}
				}
				e.tip=tip;
			}
		}
		
	}
</script>

<style lang="scss">
	@import "../../commons/css/mycss.scss";
	.top-bar{
		background: rgba(255,255,255,0.96);
		border-bottom: 1rpx solid black;
		.search-div{
			position: absolute;
			// top: 0;
			left: 0;
			width: 100%;
			z-index: -1;
			box-sizing: border-box;
			padding: 14rpx 118rpx 14rpx $uni-spacing-col-base;
		}
		.search{
			padding: 0 60rpx 0 12rpx;
			height: 60rpx;
			background: $uni-bg-color-grey;
			border-radius: 10rpx;
		}
		.search-img{
			position: absolute;
			right: 130rpx;
			top: 22rpx;
			width: 40rpx;
			height: 40rpx;
		}
	}
	.main{
		padding : 88rpx $uni-spacing-col-base;
		.result{
			padding: $uni-spacing-col-base;
			.title{
				font-size: 44rpx;
				font-weight: 600;
				color: $uni-text-color;
				line-height: 60rpx;
			}
			.list{
				padding: 20rpx 0;
				width: 100%;
				height: 80rpx;
				
				image{
					float: left;
					width: 80rpx;
					height: 80rpx;
					border-radius: $uni-border-radius-base;
				}
			}
			.names{
				float: left;
				padding-left: $uni-spacing-col-base;
			}
			.name{
				font-size: 36rpx;
				color: $uni-text-color;
				line-height: 50rpx;
			}
			.email{
				font-size: $uni-font-size-sm;
				color: $uni-text-color;
				line-height: 28rpx;
			}
			.right-button{
				float: right;	
				width: 120rpx;
				height: 48rpx;
				background: $uni-color-primary;
				border-radius: 24rpx;
				font-size: $uni-font-size-sm;
				color: $uni-text-color;
				line-height: 48rpx;
				margin-top: 16rpx;
				text-align: center;
			}
			.send{
				background: $uni-color-primary;
				color: $uni-text-color;
			}
			.add{
				background: rgba(74,170,255,0.1);
				color: $uni-color-success;
			}
		}
	}
</style>