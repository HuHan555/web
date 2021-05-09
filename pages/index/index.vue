<!-- 添加成长发育记录页面 -->
<template>
	<view class="container">
		<!-- 血压 -->
		<view class="item">
			<text class="title">血压</text>
			<!-- <text class="op" @click="sub(1,1)">-</text> -->
			<input type="text"  v-model="BP" placeholder="90-140"/>
			<!-- <text class="op" @click="add(1,1)">+</text> -->
			<text>mmHg</text>
		</view>
		<!-- 心率 -->
		<view class="item">
			<text class="title">心率</text>
			<!-- <text class="op" @click="sub(2,1)">-</text> -->
			<input type="text"  v-model="BPM" placeholder="60-100"/>
			<!-- <text class="op" @click="add(2,1)">+</text> -->
			<text>次/分钟</text>
		</view>
		<!-- 空腹血糖 -->
		<view class="item">
			<text class="title">空腹血糖</text>
			<!-- <text class="op" @click="sub(3,0.1)">-</text> -->
			<input type="text" v-model="GLU" placeholder="3.9-6.1"/>
			<!-- <text class="op" @click="add(3,0.1)">+</text> -->
			<text>mol</text>
		</view>
		<!-- 总胆固醇 -->
		<view class="item">
			<text class="title" >总胆固醇</text>
			<!-- <text class="op" @click="sub(4,0.1)">-</text> -->
			<input type="text"  v-model="TCHO" placeholder="3.1-5.7"/>
			<!-- <text class="op" @click="add(4,0.1)">+</text> -->
			<text>mmol/l</text>
		</view>
		<!-- 甘油三酯 -->
		<view class="item">
			<text class="title">甘油三酯</text>
			<!-- <text class="op" @click="sub(5,0.1)">-</text> -->
			<input type="text" v-model="TG"  placeholder="0.4-1.7"/>
			<!-- <text class="op" @click="add(5,0.1)">+</text> -->
			<text>mmol/l</text>
		</view>
		<!-- 尿酸 -->
		<view class="item">
			<text class="title ">尿酸</text>
			<!-- <text class="op" @click="sub(6,1)">-</text> -->
			<input type="text" v-model='acid' placeholder="89-360" />
			<!-- <text class="op" @click="add(6,1)">+</text> -->
			<text>μmol/L</text>
		</view>

		<!-- 低密度脂蛋白 -->
		<view class="item itemo">
			<text class="title">低密度脂蛋白</text>
			<!-- <text class="op" @click="sub(7,0.1)">-</text> -->
			<input type="text" v-model='LDL' placeholder="1-3.4" />
			<!-- <text class="op" @click="add(7,0.1)">+</text> -->
			<text>mmol/L</text>
		</view>

		<!-- 记录时间 -->
		<view class="item itemo">
			<text class="title ">记录时间</text>
			<input type="text" v-model="record_time"  /><text></text>
		</view>
		<!-- 情况说明 -->
		<view class="item itemo">
			<text class="title ">情况说明</text>
			<input type="text" v-model="condition" /><text></text>
		</view>
		<button type="primary" @click="submit()">提交</button>
		<!-- <u-toast ref="uToast" /> -->
	</view>
</template>

<script>
	import datas from "../../commons/js/datas.js"
	export default {
		data() {
			return {
				// 血压
				BP:'',
				
				//心率
				BPM:'',
				
				//空腹血糖
				GLU:'',
				
				//总胆固醇
				TCHO:'',
				
				//甘油三酯
				TG:'',
				
				//尿酸
				acid:'',
				
				//低密度脂蛋白
				LDL:'',
				
				//记录时间
				record_time:'',
				//情况说明
				condition:'',
				phone:'',
				ip:'',
			}
		},
		onLoad() {
			let user=uni.getStorageSync("user")
			this.phone=user.phone
			let t=new Date()
			this.record_time=t.getFullYear()+'-'+((t.getMonth()*1)+1)+'-'+t.getDate()
			this.ip=datas.ip()
		},
		methods: {
			submit:function(){
				let that=this
				uni.request({
					url:that.ip+'submitinfo',
					method:'POST',
					data:{
						userPhone:that.phone,
						
						bp:that.BP,
						bpm:that.BPM,
						glu:that.GLU,
						tcho:that.TCHO,
						tg:that.TG,
						acid:that.acid,
						ldl:that.LDL,
						recordt:that.record_time,
						condi:that.condition,
					},
					dataType:'json',
					success:(res)=>{
						// console.log(that.BP)
						console.log(that.condition)
					}
				})
			}
		}
	}
</script>

<style lang="less">
.container{
	padding: 30rpx;
	.item{
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		height: 80rpx;
		border-bottom: 1px solid #ccc;
		.title{
			margin-right: 30rpx;
			text-align: center;
			width: 220rpx;
			font-size: 32rpx;
		}
		input{
			margin-right: 30rpx;
			width: 200rpx;
			height: 60rpx;
			background-color: #eee;
		}
		.op{
			margin-right: 30rpx;
			font-size: 60rpx;
			font-weight: 400;
			color: #0796D9;
		}
		.itemo{
			display: flex;
			justify-content: flex-start;
		}
		
	}
}
.level{
	height: 60rpx;
	margin: 20rpx 0;
	padding: 0 10rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	view{
		width: 20%;
		height: 100%;
		line-height: 60rpx;
		text-align: center;
		border:1px solid #ccc;
	}
}
</style>
