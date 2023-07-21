// ----------------------------------- constants  ----------------------------------------
const GET_ALL_DIRECT_MESSAGES = 'messages/GET_ALL_DIRECT_MESSAGES'
const GET_DIRECT_MESSAGE = 'messages/GET_DIRECT_MESSAGE'
const CREATE_MESSAGE = 'messages/CREATE_MESSAGE'
const CLEAR_MESSAGES = 'messages/CLEAR_MESSAGES'


// ----------------------------------- action creators   ---------------------------------
const getAllDirectMessages = (directMessages) => ({
  type: GET_ALL_DIRECT_MESSAGES,
  directMessages
})

const getDirectMessage = (messages) => ({
  type: GET_DIRECT_MESSAGE,
  messages

})


export const clearMessages = () => ({
  type: CLEAR_MESSAGES
})



// ----------------------------------- thunks  ----------------------------------------

export const getAllDirectMessagesThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/messages/user/${userId}`)

  if (res.ok) {
    let data = await res.json();
    dispatch(getAllDirectMessages(data));
    return data;
  }
}

export const getDirectMessageThunk = (dmId) => async (dispatch) => {
  const res = await fetch(`/api/messages/${dmId}`)

  if (res.ok) {
    let data = await res.json();
    dispatch(getDirectMessage(data));
    return data;
  }
}


// ----------------------------------- Reducer  ----------------------------------------
let initialState = { allMessages: {} , currentMessages: {}}

export default function messageReducer(state = initialState, action) {
  let newState = {}
	switch (action.type) {
    case GET_ALL_DIRECT_MESSAGES:
      newState = {...state, allMessages: {}}
      action.directMessages.forEach(dm => {
        newState.allMessages[dm.id] = dm
      })
      return newState;

    case GET_DIRECT_MESSAGE:
      newState = {...state, currentMessages: {}}
      action.messages.forEach(message => {
        newState.currentMessages[message.id] = message
      })
      return newState;

    case CLEAR_MESSAGES:
      newState = {...state, currentMessages: {...state.currentMessages}}
      newState.currentMessages = {}
      return newState;

    default:
			return state;
	}
}
