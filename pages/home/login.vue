<template>
	<view class="content">
		<image class="logo" src="/static/logo.jpg"></image>

		<!-- #ifdef MP-WEIXIN -->
		<button type="primary" open-type="getUserInfo" @getuserinfo="setUserInfo">使用微信登录</button>
		<!-- #endif -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			setUserInfo(user){
				this.$store.commit('user/SET_USER_INFO', user.detail.userInfo)
				uni.navigateTo({
					url: '/pages/home/index'
				});
			}
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
		height: 210rpx;
		width: 300rpx;
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
