// ----------------------------------- constants  ----------------------------------------
const GET_USER_PROFILE = 'user/GET_USER_PROFILE'
const CREATE_USER_PROFILE = 'user/CREATE_USER_PROFILE'
const UPDATE_USER_PROFILE = 'user/UPDATE_USER_PROFILE'
const GET_USER_POSTS = 'user/GET_USER_POSTS'
const SEARCH_USERS = 'user/SEARCH_USERS'

// ----------------------------------- action creators   ---------------------------------
const getUserProfile = (user) => ({
	type: GET_USER_PROFILE,
	user: user
})

const updateUserProfile = (user) => ({
  type: UPDATE_USER_PROFILE,
  user
})

const getUserPosts = (posts) => ({
  type: GET_USER_POSTS,
  posts
})

const searchUsers = (users) => ({
  type: SEARCH_USERS,
  users
})

// ----------------------------------- thunks  ----------------------------------------

export const getUserThunk = (id) => async (dispatch) => {
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

export const getUserPostsThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${userId}/posts/current`)

  if (res.ok) {
    let data = await res.json()
    dispatch(getUserPosts(data))
    return data
  }
}

// export const searchUsersThunk = () = async (dispatch) => {

// }


// ----------------------------------- Reducer  ----------------------------------------

const initialState = { user: { } , posts: { } , search: { } };

export default function userReducer(state = initialState, action) {
  let newState = {};
	switch (action.type) {
    case GET_USER_PROFILE:
      newState = {...state, user: {}}
      newState.user = action.user
			return newState

    case UPDATE_USER_PROFILE:
      newState = {...state, user: {}}
      newState.user = { ...action.user}
      return newState

    case CREATE_USER_PROFILE:
      newState = {...state, user: {}}
      newState.user = {...action.newUser}
      return newState

    case GET_USER_POSTS:
      newState = {...state, posts: { } }
      action.posts.forEach(post => newState.posts[post.id] = post )
      return newState

    default:
			return state;
	}
}
