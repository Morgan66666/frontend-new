import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { UserInfo } from '@/types'
import moment from 'moment'

const store = new Vuex.Store({
  state: {
    token: null as any,
    user: null as UserInfo | null,    
    isLogin: false,
    showChatWindow: false,
    showLoginWindow: false,
    expireTime: null as any
  },
  getters: {
    getToken (state) {
      return state.token
    },   
    getUserInfo (state) {
      return state.user
    },
    getIsLogin (state) {
      if(new Date(state?.expireTime) < new Date()){
        console.log("已过期",new Date(state?.expireTime)) 
        state.isLogin = false
        state.user = null
        state.token = null
        return false
      }

      return state.token !== null && state.user !== null && new Date(state?.expireTime) > new Date()
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
      state.expireTime = moment().add(86400000, 's')
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