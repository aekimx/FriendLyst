// ----------------------------------- constants  ----------------------------------------
const GET_USER_PROFILE = 'user/GET_USER_PROFILE'
const CREATE_USER_PROFILE = 'user/CREATE_USER_PROFILE'
const UPDATE_USER_PROFILE = 'user/UPDATE_USER_PROFILE'
const GET_USER_POSTS = 'user/GET_USER_POSTS'
const SEARCH_USERS = 'user/SEARCH_USERS'
const CREATE_USER_POST = 'user/CREATE_USER_POST'
const CREATE_USER_COMMENT = 'user/CREATE_USER_COMMENT'
const LIKE_USER_POST = 'user/LIKE_POST'
const UNLIKE_USER_POST = 'user/UNLIKE_POST'

const CLEAR_USER = 'user/CLEAR_USER'

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

const createUserPost = (post) => ({
  type: CREATE_USER_POST,
  post
})

const createUserComment = (comment) => ({
  type: CREATE_USER_COMMENT,
  comment
})

const likeUserPost = (like) => ({
  type: LIKE_USER_POST,
  like
})

const unlikeUserPost = (like) => ({
  type: UNLIKE_USER_POST,
  like
})

export const clearUser = () => ({
  type: CLEAR_USER
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
    const userProfile = response.json();
    dispatch(updateUserProfile(userProfile));
    return userProfile;
  }
}

export const getUserPostsThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${userId}/posts/current`)

  if (res.ok) {
    let userPosts = await res.json();
    dispatch(getUserPosts(userPosts));
    return userPosts;
  }
}

export const searchUsersThunk = (search) => async (dispatch) => {
  const res = await fetch(`/api/users/search`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(search)
  })


  if (res.ok) {
    let users = await res.json();
    dispatch(searchUsers(users))
    return users
  }
}

export const createUserPostThunk = (formData) => async (dispatch) => {
  const res = await fetch(`/api/posts`, {
    method: "POST",
    body: formData,
  })

  if (res.ok) {
    let data = await res.json()
    dispatch(createUserPost(data))
    return data
  }
}

export const createUserCommentThunk = (comment) => async (dispatch) => {
  const res = await fetch(`/api/comments`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment),
  })

  if (res.ok) {
    let data = await res.json()
    dispatch(createUserComment(data))
    return data
  }
}

export const likeUserPostThunk = (like) => async (dispatch) => {
  const res = await fetch(`/api/posts/${like.postId}/like`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(like)
  })

  if (res.ok) {
    let data = await res.json()
    dispatch(likeUserPost(data))
    return data
  }
}

export const unlikeUserPostThunk = (like) => async (dispatch) => {
  const res = await fetch(`/api/posts/like/${like.id}`, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' },
  })

  if (res.ok) {
    dispatch(unlikeUserPost(like))
    return
  }
}


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
      action.posts.forEach(post => {
        newState.posts[post.id] = post
      })
      return newState

    case SEARCH_USERS:
      newState = {...state, search: {}}
      action.users.forEach(user => {
        newState.search[user.id] = user
      })
      return newState;

    case CREATE_USER_POST:
      newState = {...state, posts: {...state.posts} };
      newState.posts[action.post.id] = action.post;
      return newState;

    case CREATE_USER_COMMENT:
      newState = {...state, posts: {...state.posts}};
      newState.posts[action.comment.postId].comments.push(action.comment)
      return newState;

    case LIKE_USER_POST:
      newState = {...state, posts: {...state.posts}};
      newState.posts[action.like.postId].likes.push(action.like)
      return newState;

    case UNLIKE_USER_POST:
      newState = {...state, posts: {...state.posts}};
      const newLikes = newState.posts[action.like.postId].likes.filter(like => like.id !== action.like.id)
      newState.posts[action.like.postId].likes = newLikes
      return newState;

    case CLEAR_USER:
      newState = {...state, posts: {...state.posts}, user: {...state.user}}
      newState.posts = {};
      newState.user = {};
      return newState;

    default:
			return state;
	}
}
