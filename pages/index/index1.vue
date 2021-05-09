<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left">
				<image src="../../static/imgs/1.jpeg" mode=""></image>
			</view>
			<view class="top-bar-center">
				<image src="../../static/imgs/logo.png" class="logo"></image>
			</view>
			<view class="top-bar-right">
				<view class="search">
					<image src="../../static/imgs/3.webp" mode=""></image>
				</view>
				<view class="add">
					<image src="../../static/shilu-login/4.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.content{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.top-bar{
		position: fixed;
		top: 0;
		left: 0;
		height: 88rpx;
		background: $uni-bg-color;
		// box-shadow: 0px 1px 0px 0px rgba(0,0,0,0.1);
		border-bottom: $uni-border-color;
		border: 1rpx solid red;
		box-sizing: border-box;
		padding-left: $uni-spacing-col-base;
		padding-right: $uni-spacing-col-base;
		width: 100%;
		.top-bar-left{
			float: left;
			image{
				padding-top: 10rpx;
				width: 68rpx;
				height: 68rpx;
				border-radius: 16rpx;
			}
		}
		.top-bar-center{
			position: absolute;
			text-align: center;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			// border: 1rpx solid red;
			margin: auto;
			.logo{
				padding-top: 19rpx;
				width: 88rpx;
				height: 42rpx;
			}
		}
		.top-bar-right{
			float: right;
			.search{
				width: 88rpx;
				height: 88rpx;
				display: inline-block;
				// border: 1rpx solid red;
			}
			.add{
				width: 88rpx;
				height: 88rpx;
				display: inline-block;
				// border: 1rpx solid red;
			}
			image{
				padding: 18rpx;
				width: 52rpx;
				height: 52rpx;
			}
		}
	}
</style>
