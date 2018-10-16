import Cookies from 'js-cookie'

export default {
  state: {
    userInfo: '',
    token: Cookies.get('token'),
    userMenus: ''
  },
  mutations: {
    UPDATE_USERINFO(state, data) {
      state.userInfo = data
    },
    UPDATE_USERMENUS(state, data) {
      state.userMenus = data
    }
  },
  actions: {
    /**
     * 跟新用户信息
     * @method uploadUserInfo
     * @param  {[type]}       commit [description]
     * @param  {[type]}       data   [description]
     * @return {[type]}              [description]
     * @author CoolLsk
     */
    uploadUserInfo({commit}, data) {
      commit("UPDATE_USERINFO", data)
    },
    /**
     *
     * 更新用户侧边栏菜单
     * @method uploadUserMenus
     * @param  {[type]}        commit [description]
     * @param  {[type]}        data   [description]
     * @return {[type]}               [description]
     * @author CoolLsk
     */
    uploadUserMenus({commit}, data) {
      commit("UPDATE_USERMENUS", data)
    }
  }
}
