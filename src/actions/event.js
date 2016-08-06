/*global localStorage: false, console: false*/
import $ from 'jquery'
import { BASE_URL } from './../const.js'

export const getEvent = (store, id) => {
  console.log('ALL OPEN EVENT start')
  console.log(store)
  if (id === '') {
    $.ajax({
      type: 'GET',
      url: BASE_URL + '/v1/message/topics/OPEN/0'
    }).done((data, e, status) => {
      console.log('DATA')
      console.log(data)
      if (status.status === 200) {
        console.log('ALL OPEN EVENT')
        console.log(data)
        store.dispatch('GET_EVENT', data)
        store.dispatch('SET_OFSET', 20)
        store.dispatch('OPEN')
        return true
      } else {
        return false
      }
    })
  } else {
    console.log('GET EVENT BY ID');
    $.ajax({
      type: 'GET',
      url: BASE_URL + '/v1/message/topics/'+ id +'/0'
    }).done((data, e, status) => {
      if (status.status === 200) {
        console.log(data)
        store.dispatch('GET_EVENT', data)
        store.dispatch('OPEN')
        return true
      } else {
        return false
      }
    })
  }
}
export const getClosePopEvent = (store) => {
  console.log('ALL OPEN EVENT start')
  console.log(store)
  $.ajax({
    type: 'GET',
    url: BASE_URL + '/v1/message/topics/CLOSE_POPULAR/20'
  }).done((data, e, status) => {
    console.log('DATA')
    console.log(data)
    if (status.status === 200) {
      console.log('ALL OPEN EVENT')
      console.log(data)
      store.dispatch('GET_POP_CLOSE_EVENT', data)
      return true
    } else {
      return false
    }
  })
}
export const getOpenPopEvent = (store, id) => {
  console.log('ALL OPEN EVENT start')
  console.log(store)
  if (id === undefined) {
    $.ajax({
      type: 'GET',
      url: BASE_URL + '/v1/message/topics/OPEN_POPULAR/20'
    }).done((data, e, status) => {
      console.log('DATA')
      console.log(data)
      if (status.status === 200) {
        console.log('ALL OPEN EVENT')
        console.log(data)
        store.dispatch('GET_POP_OPEN_EVENT', data)
        return true
      } else {
        return false
      }
    })
  }
}


export const getEventMore = (store, type) => {
  console.log('Load More OPEN EVENT start')
  console.log(store)
  $.ajax({
    type: 'GET',
    url: BASE_URL + '/v1/message/topics/' + type + '/' + store.state.ofset
  }).done((data, e, status) => {
    console.log('DATA')
    console.log(data)
    if (status.status === 200) {
      console.log('ALL OPEN EVENT')
      console.log(data)
      store.dispatch('GET_EVENT_MORE', data)
      store.dispatch('SET_OFSET', store.state.ofset + data.length)
      return true
    } else {
      return false
    }
  })
}



export const getCloseEvent = (store, id) => {
  console.log(store)
  console.log('IDDDDDDDDDDDDDDD')
  console.log(id);
  if (id !== '' && id !== undefined) {
    console.log('GET CLOSE EVENT');
    $.ajax({
      type: 'GET',
      url: BASE_URL + '/v1/message/topics/' + id +'/CLOSE'
    }).done((data, e, status) => {
      if (status.status === 200) {
        console.log(data)
        store.dispatch('GET_EVENT', data)
        store.dispatch('CLOSE')
        return true
      } else {
        return false
      }
    })
  } else {
    console.log('GET CLOSE EVENT BY ID');
    $.ajax({
      type: 'GET',
      url: BASE_URL + '/v1/message/topics/CLOSE/0'
    }).done((data, e, status) => {
      if (status.status === 200) {
        console.log(data)
        store.dispatch('GET_EVENT', data)
        store.dispatch('CLOSE')
        return true
      } else {
        return false
      }
    })
  }
}

export const getSingleEvent = (store, id) => {
  console.log('Check route')
  console.log(store)
  $.ajax({
    type: 'GET',
    url: BASE_URL + '/v1/message/topic/' + id
  }).done((data, e, status) => {
    if (status.status === 200) {
      console.log(data)
      store.dispatch('GET_SINGLE_EVENT', data)
      updateJoinNum(store, data.join_list.length)
      return true
    } else {
      return false
    }
  })
}
export const updateJoinNum = (store, num) => {
  store.dispatch('JOIN_NUMBER', num)
}
export const pushMessage = (store, message, type, name, id) => {
  store.dispatch('PUSH_MESSAGE', message, type, name, id)
}

export const sendMessage = (store, id, message, type) => {
  console.log('MESSAGE')
  console.log(message)
  console.log(type)
  console.log(id)
  $.ajax({
    type: 'POST',
    data: {'text': message, 'type': type},
    url: BASE_URL + '/v1/message/text/' + id + '?token=' + localStorage.getItem('token')
  }).done((data, e, status) => {
    if (status.status === 200) {
      console.log('WTFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
      console.log(data)
      store.dispatch('PUSH_MESSAGE', message, type, localStorage.getItem('name'), localStorage.getItem('id'))
      return true
    } else {
      return false
    }
  })
}

export const joinEvent = (store, id, name) => {
  sendMessage(store, id, name, 'JOIN')
  $.ajax({
    type: 'POST',
    data: {},
    url: BASE_URL + '/v1/message/join/' + id + '?token=' + localStorage.getItem('token')
  }).done((data, e, status) => {
    if (status.status === 200) {
      console.log('JOIN EVENT');
      console.log(data);
      getSingleEvent(store, id)
      location.reload()
      return true
    } else {
      return false
    }
  })
}

export const addEvent = (store, topic, description, route) => {
  $.ajax({
    type: 'POST',
    data: {'topic': topic, 'description': description},
    url: BASE_URL + '/v1/message/topic' + '?token=' + localStorage.getItem('token')
  }).done((data, e, status) => {
    if (status.status === 200) {
      if (data._id) {
      route.router.go('/topic/'+data._id)
      } else {
        alert('โปรดระบุหัวข้อ');
      }
      return true
    } else {
      return false
    }
  })
}
export const closeEvent = (store, id, route) => {
  $.ajax({
    type: 'POST',
    data: {},
    url: BASE_URL + '/v1/message/close/' + id + '?token=' + localStorage.getItem('token')
  }).done((data, e, status) => {
    if (status.status === 200) {
      console.log(data)
      route.router.go('/topics')
      return true
    } else {
      return false
    }
  })
}

export const delEvent = (store, id, route) => {
  $.ajax({
    type: 'POST',
    data: {},
    url: BASE_URL + '/v1/message/del/' + id + '?token=' + localStorage.getItem('token')
  }).done((data, e, status) => {
    if (status.status === 200) {
      console.log(route)
      route.router.go('/topics')
      return true
    } else {
      return false
    }
  })
}

export const AllEvent = (store) => {
  console.log('STORE')
  console.log(store.state.Event)
  return store.state.Event
}

export const CloseEvent = (store) => {
  if (store.state.Event instanceof Array) {
    return store.state.Event.filter((item) => {
      return (item.status === 1)
    })
  } else {
    return []
  }
}
