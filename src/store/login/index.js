export const LOGIN_SUCCESS = (state, token) => {
  state.authen = true
}

export const LOGOUT = (state, token) => {
  state.authen = false
}
