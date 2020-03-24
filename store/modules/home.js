// import {
// 	selectCsListToStu, 
// 	queryCourseToStu, 
// 	selectLiveListByCourseToStu, 
// 	selectResVideoByCourseToStu,
// 	selectMyCourseListToStu,
// 	saveCourseEnter,
// 	saveCourseEnterWeixin,
// 	queryCloudCourseOrderById,
// 	getLoginInfoByCode,
// 	getLoginInfoByCodeAndUserInfo
// } from '@/api/homeApi'
import {getStore,setStore} from '../../utils/service'
const home = {
    namespaced: true,
    state: {
        userInfo: getStore('userInfo')|| {},
        role: getStore('role')|| [],
        uniToken: getStore('uniToken') || '',
        menu: getStore('menu') || [],
        permission: {},
		openId:''
    },
    getters: {},
    mutations: {
        SET_TOKEN: (state, params) => {
            state.uniToken = params
            setStore('uniToken', params)
        },
        SET_MENU: (state, params) => {
            state.menu = params
            setStore('menu', params)
        },
        SET_ROLE: (state, params) => {
            state.role = params 
            setStore('role', params)
        },
        SET_USER_INFO: (state, params) => {
            state.userInfo = params
            setStore('userInfo', params)
        },
		SET_OPENID:(state,params)=>{
            state.uniToken = params.openId
            setStore('uniToken', params.openId)
			state.openId = params.openId
		}
    },
    actions: {
        // SelectCsListToStu ({state, commit, dispatch}, params) {
        //     return new Promise((resolve, reject) => {
        //         selectCsListToStu(params).then(res => {
        //             resolve(res)
        //         })
        //     })
        // },
		// QueryCourseToStu ({state, commit, dispatch}, params) {
		//     return new Promise((resolve, reject) => {
		//         queryCourseToStu(params).then(res => {
		//             resolve(res)
		//         })
		//     })
		// },
		// SelectLiveListByCourseToStu ({state, commit, dispatch}, params) {
		//     return new Promise((resolve, reject) => {
		//         selectLiveListByCourseToStu(params).then(res => {
		//             resolve(res)
		//         })
		//     })
		// },
		// SelectResVideoByCourseToStu ({state, commit, dispatch}, params) {
		//     return new Promise((resolve, reject) => {
		//         selectResVideoByCourseToStu(params).then(res => {
		//             resolve(res)
		//         })
		//     })
		// },
		// SelectMyCourseListToStu ({state, commit, dispatch}, params) {
		//     return new Promise((resolve, reject) => {
		//         selectMyCourseListToStu(params).then(res => {
		//             resolve(res)
		//         })
		//     })
		// },
		// SaveCourseEnter ({state, commit, dispatch}, params) {
		//     return new Promise((resolve, reject) => {
		//         saveCourseEnter(params).then(res => {
		//             resolve(res)
		//         })
		//     })
		// },
		// SaveCourseEnterWeixin ({state, commit, dispatch}, params) {
		//     return new Promise((resolve, reject) => {
		//         saveCourseEnterWeixin(params).then(res => {
		//             resolve(res)
		//         })
		//     })
		// },
		// QueryCloudCourseOrderById ({state, commit, dispatch}, params) {
		//     return new Promise((resolve, reject) => {
		//         queryCloudCourseOrderById(params).then(res => {
		//             resolve(res)
		//         })
		//     })
		// },
		// GetLoginInfoByCode ({state, commit, dispatch}, params) {
		//     return new Promise((resolve, reject) => {
		//         getLoginInfoByCode(params).then(res => {
		//             resolve(res)
		//         })
		//     })
		// },
		// GetLoginInfoByCodeAndUserInfo ({state, commit, dispatch}, params) {
		//     return new Promise((resolve, reject) => {
		//         getLoginInfoByCodeAndUserInfo(params).then(res => {
		//             resolve(res)
		//         })
		//     })
		// },
		// GetStudentListByParentId ({state, commit, dispatch}, params) {
		//     return new Promise((resolve, reject) => {
		//         getStudentListByParentId(params).then(res => {
		//             resolve(res)
		//         })
		//     })
		// }
    }
}
export default home
