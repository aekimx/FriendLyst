// ----------------------------------- constants  ----------------------------------------
const GET_ALL_FRIENDS = 'friends/GET_ALL_FRIENDS'

// ----------------------------------- action creators   ---------------------------------
const getAllFriends = (friends) => ({
  type: GET_ALL_FRIENDS,
  friends
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


export const createUserThunk = (userProfile) => async (dispatch) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userProfile)
  })

  if (response.ok) {
    const data = response.json()
    dispatch(createUserThunk(data))
    return data
  }

}


// ----------------------------------- Reducer  ----------------------------------------
let initialState = {}

export default function friendReducer(state = initialState, action) {
  let newState = {}
	switch (action.type) {
    case GET_ALL_FRIENDS:
      newState = {...state}
      action.friends.forEach(friend => {
        newState[friend.id] = friend
      })
      return newState
		default:
			return state;
	}
}
