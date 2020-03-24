<template>
	<!-- <image class="logo" mode="center" src="/static/logo.jpg"></image> -->
	<view class="content">
		<view class="text des">
			<text>世间奇女子 </text>
		</view>
		<view class="text name">
			<text>猪大春 </text>
		</view>

	</view>

</template>

<script>
	export default {
		onLoad() {
			// setTimeout(() => {
			// 	uni.navigateTo({
			// 		url: '/pages/home/index'
			// 	});
			// }, 1000)
		}
	}
</script>

<style>
	.logo {
		/* height: 100rpx;
		width: 100rpx; */
	}

	.content {
		width: 100vw;
		height: 100vh;
		background: #000;
		display: flex;
		/* align-items: center; */
		justify-content: center;

	}

	.text {
		font-size: 60rpx;
		width: 100rpx;
		color: #FFFFFF
	}
	.des{
		margin-top: 25vh;
	}
	.name{
		margin-top: 50vh;
		text-shadow: 2px 2px 10px   #fafafa;
		/* font-variation-settings: 'wdth' 25; */
	}
</style>
