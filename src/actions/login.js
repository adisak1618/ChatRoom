/*global localStorage: false, console: false*/
import $ from 'jquery'
import { BASE_URL } from './../const.js'
export const LoginSuccess = (store) => {
  console.log('login success')
  console.log(store)
  store.dispatch('LOGIN_SUCCESS')
}
export const LoginFail = (store) => {
  console.log('login fail')
  console.log(store)
  localStorage.setItem('token', '')
  store.dispatch('LOGOUT')
  window.location = '/#!/login'
}
export const login = (store, email, password) => {
  console.log(store)
  console.log(email)
  console.log(password)
  $.ajax({
    type: 'POST',
    url: BASE_URL + '/v1/authen/login',
    data: {'email': email, 'password': password}
  }).done((data, e, status) => {
    if (data.success === true && status.status === 200) {
      console.log(data)
      store.dispatch('LOGIN_SUCCESS')
      window.location = '/#!/topics'
      localStorage.setItem('token', data.token)
      localStorage.setItem('name', data.name)
      localStorage.setItem('id', data.id)
      return true
    } else {
      return false
    }
  })
}

export const signup = (store, name, email, password) => {
  console.log(store)
  console.log(email)
  console.log(password)
  $.ajax({
    type: 'POST',
    url: BASE_URL + '/v1/authen/signup',
    data: {'email': email, 'password': password, 'name': name}
  }).done((data, e, status) => {
    if (status.status === 200) {
      console.log(data)
      window.location = '/#!/login'
      $('.ui.signup_success.modal').modal('show')
    }
  })
}
