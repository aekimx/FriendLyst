// ----------------------------------- constants  ----------------------------------------
const GET_ALL_FRIENDS = 'friends/GET_ALL_FRIENDS'
const GET_ALL_REQUESTS = 'friends/GET_ALL_REQUESTS'
const ACCEPT_REQUEST = 'friends/ACCEPT_REQUEST'
const DELETE_REQUEST = 'friends/DELETE_REQUEST'

// ----------------------------------- action creators   ---------------------------------
const getAllFriends = (friends) => ({
  type: GET_ALL_FRIENDS,
  friends
})

const getAllRequests = (requests) => ({
  type: GET_ALL_REQUESTS,
  requests
})

const acceptRequest = (request) => ({
  type: ACCEPT_REQUEST,
  request
})

const deleteRequest = (request) => ({
  type: DELETE_REQUEST,
  request
})


// ----------------------------------- thunks  ----------------------------------------

export const getAllFriendsThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/friends/user/${userId}`)

  if (res.ok) {
    let data = await res.json();
    dispatch(getAllFriends(data));
    return data;
  }

}

export const getAllRequestsThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/friends/user/${userId}/requests`)

  if (res.ok) {
    let data = await res.json();
    dispatch(getAllRequests(data));
    return data;
  }
}

export const acceptRequestThunk = (friendRequestId) => async (dispatch) => {
  const res = await fetch(`/api/friends/${friendRequestId}`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
  })

  if (res.ok) {
    const data = await res.json();
    dispatch(acceptRequest(data))
    return data;
  }

}

export const deleteRequestThunk = (friendRequestId) => async (dispatch) => {
  const res = await fetch(`/api/friends/${friendRequestId}`, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' },
  })

  if (res.ok) {
    const data = await res.json();
    dispatch(deleteRequest(data))
    return data;
  }
}


// ----------------------------------- Reducer  ----------------------------------------
let initialState = {allFriends: {}, allRequests: {}}

export default function friendReducer(state = initialState, action) {
  let newState = {}
	switch (action.type) {
    case GET_ALL_FRIENDS:
      newState = {...state}
      action.friends.forEach(friend => {
        newState.allFriends[friend.id] = friend
      })
      return newState

    case GET_ALL_REQUESTS:
      newState = {...state}
      action.requests.forEach(request => {
        newState.allRequests[request.id] = request
      })
      return newState

    case ACCEPT_REQUEST:
      newState = {...state}
      delete newState.allRequests[action.request.id]
      newState.allFriends[action.request.id] = action.request
      return newState;

      default:
			return state;
	}
}
