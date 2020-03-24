// import {login,getUserInfo,logout,analysisUserInfo} from '@/api/userApi'
import {getStore,setStore} from '@/utils/service'
const user = {
    namespaced: true,
    state: {
        userInfo: getStore('userInfo')|| {},
        role: getStore('role')|| [],
        uniToken: getStore('uniToken') || '',
        menu: getStore('menu') || [],
        permission: {},
		openId:'',
		studentInfo: {},
		unionId: getStore('unionId') || '', // wxtest000003
		hideWeview: false
    },
    getters: {},
    mutations: {
		SET_VIEW: (state, params) => {
		    state.hideWeview = params
		},
		SET_UNIONID: (state, params) => {
		    state.unionId = params
		    setStore('unionId', params)
		},
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
		SET_STUDENT_INFO: (state, params) => {
		    state.studentInfo = params
			// console.log(state.studentInfo)
		},
		SET_OPENID:(state,params)=>{
            state.uniToken = params.openId
            setStore('uniToken', params.openId)
			state.openId = params.openId
		}
    },
    actions: {
        Login ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                login(params).then(res => {
                    commit('SET_TOKEN', res.data.token)
                    resolve(res)
                })
            })
        },
        Logout ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                logout(params).then(res => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLE', [])
                    commit('SET_USER_INFO', {})
                    resolve(res)
                })
            })
        },
        GetUserInfo ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                getUserInfo(params).then(res => {
                    commit('SET_ROLE', res.data.role)
                    commit('SET_USER_INFO', res.data)
                    resolve(res)
                })
            })
        },
		AnalysisUserInfo ({state, commit, dispatch}, params) {
		    return new Promise((resolve, reject) => {
		        analysisUserInfo(params).then(res => {
					// console.log(res)
					if(res.status === 200){
						commit('SET_STUDENT_INFO', res.data)
						setStore('schoolId',res.data.schoolId)
						setStore('schoolName',res.data.schoolName)
						setStore('studentId',res.data.userId)
						setStore('userName',res.data.userName)
					}
					resolve(res)
		        })
		    })
		},
        GetMenu ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                var role = state.role.length > 0 ? state.role[0] : ''
                getMenu(role).then(res => {
                    commit('SET_MENU', res.data)
                    resolve(res)
                })
            })
        },
        // 将菜单列表扁平化形成权限列表
        GetPermissionList ({state, dispatch}) {
            return new Promise((resolve) => {
                let permissionList = []
                // 将菜单数据扁平化为一级
                function flatNavList (arr) {
                    for (let v of arr) {
                        if (v.children && v.children.length) {
                            flatNavList(v.children)
                        } else {
                            permissionList.push(v)
                        }
                    }
                }
                // dispatch('GetUserInfo', state.token).then(res => {
                    dispatch('GetMenu').then(res => {
                        flatNavList(state.menu)
                        resolve(permissionList)
                    })
                // })
            })
        }
    }
}
export default user
