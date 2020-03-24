// import {getQueryString} from '../utils/util'
const getters = {
	hideWeview:  state => state.user.hideWeview,
    uniToken: state => state.user.uniToken,
	unionId: state => state.user.unionId,
	roleCode (state) {
		return 'Student'  // Student
	},
	token (state) {
		// let curPage = getCurPage();
		// console.log(curPage)
		var url = location?location.href : ''
		// var params = getQueryString(url) ? getQueryString(url) : {}
		var token = params.token ? params.token : '433caedb'
		return token
	},
	studentInfo: state => state.user.studentInfo
}
export default getters
