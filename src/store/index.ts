import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { UserInfo } from '@/types'

const store = new Vuex.Store({
  state: {
    token: null,
    user: null as UserInfo | null,    
    isLogin: false,
    showChatWindow: false,
    showLoginWindow: false

  },
  getters: {
    getToken (state) {
      return state.token
    },   
    getUserInfo (state) {
      return state.user
    },
    getIsLogin (state) {
      //return state.token !== null && state.user !== null && new Date(state.token?.expireTime) > new Date()
      return state.user !== null
    },
    getShowChatWindow(state){
      return state.showChatWindow
    },
    getShowLoginWindow(state){
      return state.showLoginWindow
    }

  },
  mutations: {
    SetToken (state, token) {
      // token.expireTime = moment().add(token.expires_in, 's')
      state.token = token
    },
    LoginIn (state, user) {
      state.user = user      
      state.isLogin = true
      console.log('LoginIn', state)
    },
    LoginOut: state => {
      state.token = null
      state.user = null
      state.isLogin = false
    },
    SetShowChatWindow(state, show){
      state.showChatWindow = show
    },
    SetShowLoginWindow(state, show){
      state.showLoginWindow = show
    }
  },
  actions: {
    SetToken (context, token) {
      context.commit('SetToken', token)
    },
    LoginIn (context, user) {
      context.commit('LoginIn', user)
    },
    LoginOut (context) {
      context.commit('LoginOut')
    },
    SetShowChatWindow(context, show){
      context.commit('SetShowChatWindow',show)
    },
    SetShowLoginWindow(context, show){
      context.commit('SetShowLoginWindow',show)
    }
  },
  plugins: [createPersistedState()]
})

export default store