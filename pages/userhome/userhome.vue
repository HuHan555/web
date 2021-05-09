<template>
	<view>
		<view class="top-bar">
			<view class="top-bar-left" @click="BackOne">
				<image src="../../static/imgs/back.svg" class="back-img"></image>
			</view>
			<!-- <view class="top-bar-right">
				<view class="more-img">
					<image src="../../static/imgs/more.jpg"></image>
				</view>
			</view> -->
		</view>
		<view class="bg">
			<view class="bg-white" :animation="animationData4">
				
			</view>
			<image :src="img" class="bg-img" mode="aspectFill"></image>
		</view>
		<view class="main">
			<view class="user-header">
				<view class="sex" :style="{background:sexcolor}" :animation="animationData3">
					<image src="../../static/imgs/male.jpeg" mode=""></image>
				</view>
				<image :src="img" mode="aspectFill" class="user-img" :animation="animationData2" @click="chooseImage"></image>
			</view>
			<view class="user-inf">
				<view class="name">
					{{this.phone}}
				</view>
				<view class="nick">
					邮件:{{this.email}}
				</view>
				<view class="introduct">
					{{user.introduct}}
				</view>
			</view>
		</view>
		<view class="bottom-bar">
			<view class="bottom-btn btn" @tap="addFriendAnimat()">
				加为好友
			</view>
		</view>
		<view class="add-misg" :style="{height:addHeight+'px',bottom:-+addHeight+'px'}" :animation="animationData">
			<view class="name">
				{{this.phone}}
			</view>
			<textarea :value="myname+'请求加为好友~'" maxlength="120" class="add-main"></textarea>
		</view>
		<view class="add-bt bottom-bar" :animation="animationData1">
			<view class="close btn" @tap="addFriendAnimat()">取消</view>
			<view class="send btn" @click="sendapply">发送</view>
		</view>
	</view>
</template>

<script>
	import datas from "../../commons/js/datas.js"
	export default {
		data() {
			return {
				phone:'',
				sexcolor:"rgba(255,93,91,1)",//性别颜色
				user:{
					name:"胡晗",
					nick:"晗之国",
					introduct:"做最好的自己，做最好的自己，做最好的自己，做最好的自己，做最好的自己，做最好的自己，做最好的自己，做最好的自己，做最好的自己，做最好的自己，做最好的自己，"
				},
				myname:"帅哥",
				addHeight:'',//add板块高度
				animationData:{},//动画1
				animationData1:{},//动画2
				animationData2:{},//动画3
				animationData3:{},//动画4
				animationData4:{},//动画5
				isAdd:false,//监听动画
				img:'',
				email:'',
				userphone:'',
				ip:'',
			}
		},
		onReady() {
			this.getElementStyle()
		},
		onLoad(option) {
			// const item = JSON.parse(decodeURIComponent(option.item));
			this.phone=option.phone
			this.ip=datas.ip()
			let user1=uni.getStorageSync("user")
			this.userphone=user1.phone
			if(this.phone==user1.phone){
				this.img=user1.Imgurl;
				this.email=user1.email;
				
			}else{
				console.log(this.phone)
				let that=this
				uni.request({
					url:that.ip+'userhome',
					method:"POST",
					data:{
						phone:that.phone
					},
					success(res) {
						// console.log(res.data)
						that.img=that.ip+res.data.Imgurl
						that.email=res.data.email
						// console.log(res)
					}
				})
			}
			
			// console.log(this.phone)
		},
		methods: {
			sendapply:function(){
				let that=this
				uni.request({
					url:that.ip+'search/sendapply',
					data:{
						sendphone:this.userphone,
						recphone:this.phone,
						sendtime:new Date(),
						isvalid:"1"
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
			chooseImage(){
				let that=this
				
			},
			//回退
			BackOne(){
				uni.navigateBack({
					delta:1,
				});
			},
			//获取页面高度
			getElementStyle:function(){
				const query = uni.createSelectorQuery().in(this);
				query.select('.bg').boundingClientRect(data => {
				  // console.log("得到布局位置信息" + JSON.stringify(data));
				  // console.log("节点离页面顶部的距离为" + data.top);
				  this.addHeight=data.height-186;
				}).exec();
			},
			//添加好友动画
			addFriendAnimat:function(){
				this.isAdd=!this.isAdd;
				var animation = uni.createAnimation({
				  duration: 300,
					timingFunction: 'ease',
				})
				var animation1 = uni.createAnimation({
				  duration: 300,
					timingFunction: 'ease',
				})
				var animation2 = uni.createAnimation({
				  duration: 300,
					timingFunction: 'ease',
				})
				var animation3 = uni.createAnimation({
				  duration: 300,
					timingFunction: 'ease',
				})
				var animation4 = uni.createAnimation({
				  duration: 300,
					timingFunction: 'ease',
				})
				if(this.isAdd){
					animation.bottom(0).step()
					animation1.bottom(0).step()
					animation2.width(120).height(120).step()
					animation3.opacity(0).step()
					animation4.backgroundColor('rgba(255,228,49,0.4)').step()
				}else{
					animation.bottom(-this.addHeight).step()
					animation1.bottom(-100).step()
					animation2.width().height().step()
					animation3.opacity(1).step()
					animation4.backgroundColor('rgba(255,228,49,0)').step()
				}
				
			
				this.animationData = animation.export()
				this.animationData1 = animation1.export()
				this.animationData2 = animation2.export()
				this.animationData3 = animation3.export()
				this.animationData4 = animation4.export()
			}
		}
	}
</script>

<style lang="scss">
	@import "../../commons/css/mycss.scss";
	.bg{
		position: fixed;
		z-index: -2;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		.bg-white{
			width: 100%;
			height: 100%;
			// background-color: #eee;
		}
		.bg-img{
			
			opacity: 0.4;
			position: absolute;
			z-index: -1;
			left: -10rpx;
			top: -10rpx;
			width: 110%;
			height: 110%;
			filter: blur(16px);
		}
	}
	.main{
		text-align: center;
		padding-top: 240rpx;
		.user-header{
			margin: 0 auto;
			width: 412rpx;
			height: 412rpx;
			position: relative;
			.sex{
				position: absolute;
				z-index: 11;
				bottom: 22rpx;
				right: 22rpx;
				width: 64rpx;
				height: 64rpx;
				
				border-radius: $uni-border-radius-circle;
				image{
					padding: 16rpx;
					width: 32rpx;
					height: 32rpx;
				}
			}
			.user-img{
				z-index: 10;
				top: 0;
				width: 400rpx;
				height: 400rpx;
				border-radius: 48rpx;
				border: 6rpx solid rgba(255,255,255,1);
				box-shadow: 0rpx 36rpx 40rpx 0rpx rgba(39,40,50,0.1);
			}
		}
		.user-inf{
			padding-top: 42rpx;
			.name{
				font-size: 52rpx;
				color: $uni-text-color;
				line-height: 74rpx;
			}
			.nick{
				font-size: $uni-font-size-base;
				line-height: 40rpx;
				color: $uni-text-color;
			}
			.introduct{
				padding: 20rpx 100rpx;
				width: 552rpx;
				font-size: $uni-font-size-base;
				font-weight: 300;
				color:$uni-text-color;
				line-height: 48rpx;
			}
		}
	}
	.bottom-bar{
		.bottom-btn{
			background: $uni-color-primary;
			margin: 0 $uni-spacing-col-base;
		}
	}
	
	.add-misg{
		position: fixed;
		// bottom: 0;
		width: 100%;
		box-sizing: border-box;
		padding: 0 56rpx;
		// height: 1252rpx;
		background: rgba(255,255,255,1);
		border-radius: 40rpx 40rpx 0rpx 0rpx;
		.name{
			padding: 168rpx 0rpx 48rpx;
			font-size: 52rpx;
			color:$uni-text-color;
			line-height: 74rpx;
		}
		.add-main{
			padding: 18rpx 22rpx;
			box-sizing: border-box;
			width: 100%;
			height: 420rpx;
			background: $uni-bg-color-grey;
			border-radius: $uni-border-radius-base;
			font-size: $uni-font-size-lg;
			color:$uni-text-color;
			line-height: 44rpx;
		}
	}
	.add-bt{
		bottom: -200rpx;
		z-index: 100;
		display: flex;
		.close{
			width: 172rpx;
			background: $uni-bg-color-hover;
			margin-left: $uni-spacing-col-base;
		}
		.send{
			margin:0 $uni-spacing-col-base;
			flex: auto;
			background: $uni-color-primary;

		}
	}
</style>
