// ----------------------------------- constants  ----------------------------------------
const GET_ALL_FRIENDS = 'friends/GET_ALL_FRIENDS'
const GET_ALL_REQUESTS = 'friends/GET_ALL_REQUESTS'
const ACCEPT_REQUEST = 'friends/ACCEPT_REQUEST'
const DELETE_REQUEST = 'friends/DELETE_REQUEST'
const DELETE_FRIEND = 'friends/DELETE_FRIEND'
const CREATE_REQUEST = 'friends/CREATE_REQUEST'

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

const deleteFriend = (friend) => ({
  type: DELETE_FRIEND,
  friend
})

const createRequest = (friend) => ({
  type: CREATE_REQUEST,
  friend
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

export const deleteFriendThunk = (friendId) => async (dispatch) => {
  const res = await fetch(`/api/friends/${friendId}`, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' },
  })

  if (res.ok) {
    const data = await res.json();
    dispatch(deleteFriend(data))
    return data;
  }
}

export const addFriendThunk = (friend) => async (dispatch) => {
  const response = await fetch(`/api/friends`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(friend)
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(createRequest(data))
    return data
  }
}


// ----------------------------------- Reducer  ----------------------------------------
let initialState = {allFriends: {}, allRequests: {}}

export default function friendReducer(state = initialState, action) {
  let newState = {}
	switch (action.type) {
    case GET_ALL_FRIENDS:
      newState = {...state, allFriends: {}}
      action.friends.forEach(friend => {
        newState.allFriends[friend.id] = friend
      })
      return newState

    case GET_ALL_REQUESTS:
      newState = {...state, allRequests: {}}
      action.requests.forEach(request => {
        newState.allRequests[request.id] = request
      })
      return newState

    case ACCEPT_REQUEST:
      newState = {...state, allRequests: {} };
      delete newState.allRequests[action.request.id];
      newState.allFriends[action.request.id] = action.request;
      return newState;

    case DELETE_REQUEST:
      newState = {...state, allRequests: { ...state.allRequests } };
      delete newState.allRequests[action.request.id];
      return newState;

    case DELETE_FRIEND:
      newState = {...state, allFriends: { ...state.allFriends } };
      delete newState.allFriends[action.friend.id];
      return newState;

    case CREATE_REQUEST:
      newState = {...state, allRequests: {...state.allRequests}};
      newState.allRequests[action.friend.id] = action.friend
      return newState;

    default:
			return state;
	}
}
