// ----------------------------------- constants  ----------------------------------------
const GET_ALL_FRIENDS = 'friends/GET_ALL_FRIENDS'
const GET_ALL_REQUESTS = 'friends/GET_ALL_REQUESTS'

// ----------------------------------- action creators   ---------------------------------
const getAllFriends = (friends) => ({
  type: GET_ALL_FRIENDS,
  friends
})

const getAllRequests = (requests) => ({
  type: GET_ALL_REQUESTS,
  requests
})


// ----------------------------------- thunks  ----------------------------------------

export const getAllFriendsThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/friends/user/${userId}`)

  if (res.ok) {
    let data = await res.json()
    dispatch(getAllFriends(data))
    return data
  }

}

export const getAllRequestsThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/friends/user/${userId}/requests`)

  if (res.ok) {
    let data = await res.json()
    dispatch(getAllRequests(data))
    return data
  }

}


// export const createUserThunk = (userProfile) => async (dispatch) => {
//   const response = await fetch('/api/users', {
//     method: 'POST',
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(userProfile)
//   })

//   if (response.ok) {
//     const data = response.json()
//     dispatch(createUserThunk(data))
//     return data
//   }

// }


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
		default:
			return state;
	}
}
