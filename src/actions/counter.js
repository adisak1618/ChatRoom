export const increment = ({ dispatch }) => dispatch('INCREMENT')
export const decrement = ({ dispatch }) => dispatch('DECREMENT')
export const login = (data) => { data.dispatch('LOGIN'); window.location = '/#!/' }
