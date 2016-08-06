export const GET_EVENT = (state, event) => {
  // state.Event = state.Event.concat(event)
  //console.log(state.Event instanceof Array)
  // console.log('EVENTTTTTTTTTTTTTT')
  // console.log(event)
  state.Event = event;
}
export const GET_EVENT_MORE = (state, event) => {
  state.Event = state.Event.concat(event)
  //console.log(state.Event instanceof Array)
  // console.log('EVENTTTTTTTTTTTTTT')
  // console.log(event)
  // state.Event = event;
}
export const GET_SINGLE_EVENT = (state, topic) => {
  state.Topic = topic
}
export const GET_POP_CLOSE_EVENT = (state, topic) => {
  state.ClosePopEvent = topic
}
export const GET_POP_OPEN_EVENT = (state, topic) => {
  state.OpenPopEvent = topic
}

export const SET_OFSET = (state, ofset) => {
  state.ofset = ofset
}

export const PUSH_MESSAGE = (state, message, type, name, id) => {
  if (state.Topic.messages) {
    state.Topic.messages = [ ...state.Topic.messages, { 'messageType': type, 'user_id': id, 'message': message, 'name': name, 'date': new Date() } ]
    return true
  } else {
    return false
  }
}

export const CLOSE = (state) => {
  state.eventtype = 1
  // console.log('EVENTTTTTTTTTTTTTT')
  // console.log(event)
  // state.Event = event;
}
export const OPEN = (state) => {
  state.eventtype = 0
  //console.log(state.Event instanceof Array)
  // console.log('EVENTTTTTTTTTTTTTT')
  // console.log(event)
  // state.Event = event;
}

export const JOIN_NUMBER = (state, num) => {
  state.join_number = num
}
