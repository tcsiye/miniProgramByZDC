<template>
	<view class="content">
		<image class="logo" :src="userInfo.avatarUrl"></image>
		<view><text>你是：{{userInfo.nickName}}</text></view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				isOK:'false',
			}
		},
		onLoad() {
		 // this.userInfo = this.$store.state.user.userInfo
		},
		computed:{
			userInfo(){
				console.log(this.$store.state.user.userInfo)
				return this.$store.state.user.userInfo
			}
		},
		methods: {
		
		}
	}
</script>

<style>
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
		color: #8f8f94;
	}
</style>
