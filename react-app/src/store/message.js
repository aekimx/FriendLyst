// ----------------------------------- constants  ----------------------------------------
const GET_ALL_MESSAGES = 'messages/GET_ALL_MESSAGES'


// ----------------------------------- action creators   ---------------------------------
const getAllMessages = (messages) => ({
  type: GET_ALL_MESSAGES,
  messages
})


// ----------------------------------- thunks  ----------------------------------------

export const getAllMessagesThunk = (userId, friendId) => async (dispatch) => {
  const res = await fetch(`/api/messages/user/${userId}/${friendId}`)

  if (res.ok) {
    let data = await res.json();
    dispatch(getAllMessages(data));
    return data;
  }
}




// ----------------------------------- Reducer  ----------------------------------------
let initialState = {}

export default function messageReducer(state = initialState, action) {
  let newState = {}
	switch (action.type) {
    case GET_ALL_MESSAGES:
      newState = {...state}
      action.messages.forEach(message => {
        newState[message.id] = message
      })
      return newState

    default:
			return state;
	}
}
