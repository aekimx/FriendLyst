// ----------------------------------- constants  ----------------------------------------
const GET_ALL_MESSAGES = 'messages/GET_ALL_MESSAGES'


// ----------------------------------- action creators   ---------------------------------
const getAllMessages = (messages) => ({
  type: GET_ALL_MESSAGES,
  messages
})


// ----------------------------------- thunks  ----------------------------------------

export const getAllMessagesThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/messages/user/${userId}`)

  if (res.ok) {
    let data = await res.json();
    dispatch(getAllMessages(data));
    return data;
  }
}




// ----------------------------------- Reducer  ----------------------------------------
let initialState = {allMessages: {}, currentConvo: {}}

export default function friendReducer(state = initialState, action) {
  let newState = {}
	switch (action.type) {
    case GET_ALL_MESSAGES:
      newState = {...state, allMessages: {}}
      // code here
      return newState

    default:
			return state;
	}
}
