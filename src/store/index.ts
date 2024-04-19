import Vuex from 'vuex'
import moment from 'moment'
 
const store = new Vuex.Store({
  state: {
    token: null,
    user: null,    
    isLogin: false
  },
  getters: {
    getToken (state) {
      return state.token
    },   
    getUser (state) {
      return state.user
    },
    getIsLogin (state) {
      //return state.token !== null && state.user !== null && new Date(state.token?.expireTime) > new Date()
      return !(state.user === null)
    }
  },
  mutations: {
    SetToken (state, token) {
      token.expireTime = moment().add(token.expires_in, 's')
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
    }
  }
 
})
 
export default store