// ----------------------------------- constants  ----------------------------------------
const GET_USER_PROFILE = 'user/GET_USER_PROFILE'
const CREATE_USER_PROFILE = 'user/CREATE_USER_PROFILE'
const UPDATE_USER_PROFILE = 'user/UPDATE_USER_PROFILE'

// ----------------------------------- action creators   ---------------------------------
const getUserProfile = (user) => ({
	type: GET_USER_PROFILE,
	user: user
})

const updateUserProfile = (user) => ({
  type: UPDATE_USER_PROFILE,
  user
})


// ----------------------------------- thunks  ----------------------------------------

export const getUserThunk = (id) => async (dispatch) => {
  console.log('get user thunk running')
  console.log("what's getting passed into user thunk?", id)
	const response = await fetch(`/api/users/${id}`)

	if (response.ok) {
		let data = await response.json()
		dispatch(getUserProfile(data))
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

export const updateUserThunk = (userId, userProfile) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userProfile)
  })

  if (response.ok) {
    const data = response.json()
    dispatch(updateUserProfile(data))
    return data
  }
}


const initialState = { user: null };

// ----------------------------------- Reducer  ----------------------------------------
export default function userReducer(state = initialState, action) {
  let newState = {}
	switch (action.type) {
		case GET_USER_PROFILE:
      newState = { ...action.user}
			return newState
    case UPDATE_USER_PROFILE:
      newState = { ...action.user}
      return newState
    case CREATE_USER_PROFILE:
      newState = {...action.newUser}
      return newState
		default:
			return state;
	}
}
