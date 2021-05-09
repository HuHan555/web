<template>
	<view>
		<view class="top-bar">
			<view class="top-bar-left" @click="BackOne">
				<image src="../../static/imgs/back.svg" class="back-img"></image>
			</view>
		</view>
		<view class="bg">
			<view class="bg-white" >
				
			</view>
			<image :src="img" class="bg-img" mode="aspectFill"></image>
		</view>
		<view class="main">
			<view class="user-header">
				<view class="sex" :style="{background:sexcolor}" >
					<image src="../../static/imgs/male.jpeg" mode=""></image>
				</view>
				<image :src="img" mode="aspectFill" class="user-img"  @click="chooseImage"></image>
			</view>
			<view class="user-inf">
				<view class="name">
					{{this.phone}}
				</view>
				<view class="nick">
					邮件:{{this.email}}
				</view>
				<view class="introduct">
					{{introduct}}
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
				phone:'',
				sexcolor:"rgba(255,93,91,1)",//性别颜色
				about:'',
				myname:"帅哥",
				addHeight:'',//add板块高度
		
				isAdd:false,//监听动画
				img:'',
				email:'',
				record_time:'',
				data:{},
				ip:'',
				introduct:'做最好的自己',
			}
		},
		onReady() {
			this.getElementStyle()
		},
		onLoad(option) {
			this.ip=datas.ip()
			// const item = JSON.parse(decodeURIComponent(option.item));
			this.phone=option.phone
			let t=new Date()
			this.record_time=t.getFullYear()+'-'+((t.getMonth()*1)+1)+'-'+t.getDate()
			let user1=uni.getStorageSync("user")
			if(this.phone==user1.phone){
				this.img=user1.Imgurl;
				this.email=user1.email;
				
			}else{
				
				let that=this
				uni.request({
					url:that.ip+'userhome',
					method:"POST",
					data:{
						phone:that.phone
					},
					success(res) {
						that.img=that.ip+res.data.Imgurl
						that.email=res.data.email
						// console.log(res)
					}
				})
			}
			
			// console.log(this.phone)
		},
		methods: {
			
			
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
				font-size: $uni-font-size-lg;
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
