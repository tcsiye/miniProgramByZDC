<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.getUserInfo({
				success: (resa) => {
					const {
						nickName
					} = resa.userInfo
					const passUser = new Set(['Rysuke', 'be better'])
					this.$store.commit('user/SET_USER_INFO', resa.userInfo)
					if (!passUser.has(nickName)) {
						uni.navigateTo({
							url: '/pages/home/refuse'
						});
					}
				},
				fail: () => {
					// uni.navigateTo({
					// 	url: '/pages/home/login'
					// });
				}

			})
		},
		onShow: function() {
			console.log('App Show')

		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
