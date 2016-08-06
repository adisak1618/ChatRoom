export const LOGIN_SUCCESS = (state, token) => {
  state.authen = true
}

export const SET_NAME = (state, name) => {
  state.name = name
}

export const LOGOUT = (state, token) => {
  state.authen = false
}
