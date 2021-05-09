<template>
	<view>
		<!-- <scroll-view scroll-y="true">
			<view class="charts-box">
		  <qiun-data-charts type="column" :chartData="chartData"/>
			</view>
			<view class="charts-box">
			<qiun-data-charts type="column" :chartData="chartData1"/>
			</view>
			
		</scroll-view> -->
		<swiper style="height: 350px;" :indicator-dots="true">
		  <swiper-item>
		    <view class="charts-box">
		      <qiun-data-charts type="line" :chartData="chartData" :canvas2d="true" canvasId="swiperida" :inScrollView="true" :pageScrollTop="pageScrollTop"/>
		    </view>
		  </swiper-item>
		  <swiper-item>
		    <view class="charts-box">
		      <qiun-data-charts type="area" :chartData="chartData1" :canvas2d="true" canvasId="swiperidb" :inScrollView="true" :pageScrollTop="pageScrollTop"/>
		    </view>
		  </swiper-item>
		  <swiper-item>
		    <view class="charts-box">
		      <qiun-data-charts type="column" :chartData="chartData2" :canvas2d="true" canvasId="swiperidc" :inScrollView="true" :pageScrollTop="pageScrollTop"/>
		    </view>
		  </swiper-item>
		  
		</swiper>
		<swiper style="height: 350px;" :indicator-dots="true">
		  <swiper-item>
		    <view class="charts-box">
		      <qiun-data-charts type="line" :chartData="chartData3" :canvas2d="true" canvasId="swiperidd" :inScrollView="true" :pageScrollTop="pageScrollTop"/>
		    </view>
		  </swiper-item>
		  <swiper-item>
		    <view class="charts-box">
		      <qiun-data-charts type="area" :chartData="chartData4" :canvas2d="true" canvasId="swiperide" :inScrollView="true" :pageScrollTop="pageScrollTop"/>
		    </view>
		  </swiper-item>
		  <swiper-item>
		    <view class="charts-box">
		      <qiun-data-charts type="column" :chartData="chartData5" :canvas2d="true" canvasId="swiperidf" :inScrollView="true" :pageScrollTop="pageScrollTop"/>
		    </view>
		  </swiper-item>
		  <swiper-item>
		    <view class="charts-box">
		      <qiun-data-charts type="column" :chartData="chartData6" :canvas2d="true" canvasId="swiperidg" :inScrollView="true" :pageScrollTop="pageScrollTop"/>
		    </view>
		  </swiper-item>
		</swiper>
	</view>
</template>

<script src="https://s3.pstatp.com/cdn/expire-1-M/jquery/3.2.1/jquery.min.js"></script>
<script>
	import datas from "../../commons/js/datas.js"
	export default {
		data() {
			return {
				phone:'',
				pageScrollTop:0,
				// 血压
				BP:[],
				//心率
				BPM:[],
				//空腹血糖
				GLU:[],
				
				//总胆固醇
				TCHO:[],
				
				//甘油三酯
				TG:[],
				
				//尿酸
				acid:[],
				
				//低密度脂蛋白
				LDL:[],
				
				//记录时间
				record_time:[],
				//情况说明
				condition:[],
				categories:[],
				data:[],
				chartData:{
					categories:[],
					series:[],
				},
				item:{
					name:"",
					data:[],
				},
				chartData1:{
					categories:[],
					series:[],
				},
				item1:{
					name:"",
					data:[],
				},
				chartData2:{
					categories:[],
					series:[],
				},
				item2:{
					name:"",
					data:[],
				},
				chartData3:{
					categories:[],
					series:[],
				},
				item3:{
					name:"",
					data:[],
				},
				chartData4:{
					categories:[],
					series:[],
				},
				item4:{
					name:"",
					data:[],
				},
				chartData5:{
					categories:[],
					series:[],
				},
				item5:{
					name:"",
					data:[],
				},
				chartData6:{
					categories:[],
					series:[],
				},
				item6:{
					name:"",
					data:[],
				},
				ip:'',
			}
		},
		onLoad() {
			let user=uni.getStorageSync("user")
			this.phone=user.phone
			this.ip=datas.ip()
			this.getyearrecord()
			
			this.getBP()
			this.getBPM()
			this.getGLU()
			this.getTCHO()
			this.getTG()
			this.getacid()
			this.getLDL()
			
		},
		methods: {
			onPageScroll(e) {
			  this.pageScrollTop = e.scrollTop
			},
			getBP:function(){
				this.chartData.categories=this.categories
				// console.log(this.chartData.categories)
				this.item.name="BP"
				this.item.data=this.BP
				this.chartData.series=[]
				this.chartData.series.push(this.item)
			},
			getBPM:function(){
				this.chartData1.categories=this.categories
				// console.log(this.chartData.categories)
				this.item1.name="BPM"
				this.item1.data=this.BPM
				this.chartData1.series=[]
				this.chartData1.series.push(this.item1)
			},
			getGLU:function(){
				this.chartData2.categories=this.categories
				// console.log(this.chartData.categories)
				this.item2.name="GLU"
				this.item2.data=this.GLU
				this.chartData2.series=[]
				this.chartData2.series.push(this.item2)
			},
			getTCHO:function(){
				this.chartData3.categories=this.categories
				// console.log(this.chartData.categories)
				this.item3.name="TCHO"
				this.item3.data=this.TCHO
				this.chartData3.series=[]
				this.chartData3.series.push(this.item3)
			},
			getTG:function(){
				this.chartData4.categories=this.categories
				// console.log(this.chartData.categories)
				this.item4.name="TG"
				this.item4.data=this.TG
				this.chartData4.series=[]
				this.chartData4.series.push(this.item4)
			},
			getacid:function(){
				this.chartData5.categories=this.categories
				// console.log(this.chartData.categories)
				this.item5.name="acid"
				this.item5.data=this.acid
				this.chartData5.series=[]
				this.chartData5.series.push(this.item5)
			},
			getLDL:function(){
				this.chartData6.categories=this.categories
				// console.log(this.chartData.categories)
				this.item6.name="LDL"
				this.item6.data=this.LDL
				this.chartData6.series=[]
				this.chartData6.series.push(this.item6)
			},
			getyearrecord:function(){
				let that=this
				uni.request({
					url:that.ip+'record/getyearrecord',
					data:{
						phone:that.phone
					},
					success: (res) => {
						let data=res.data
						console.log(data)
						for(let i=0;i<data.length;i++){
							that.categories.unshift(data[i].recordt)
							that.BP.unshift(data[i].bp)
							that.BPM.unshift(data[i].bpm)
							that.GLU.unshift(data[i].glu)
							that.TCHO.unshift(data[i].tcho)
							that.TG.unshift(data[i].tg)
							that.acid.unshift(data[i].acid)
							that.LDL.unshift(data[i].ldl)
						}
						
						// console.log(that.categories)
					}
				})
			},
			
		}
	}
</script>

<style lang="scss">
	.charts-box {
	  width: 100%;
	  height: 300px;
	}
	.box{
		height: 375rpx;
		width: 375rpx;
		background-color: #4CD964;
		text{
			color: #007AFF;
		}
	}
	.box-active{
		background-color: #007AFF;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8F8F94;
	}
</style>
