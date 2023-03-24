
// ----------------------------------- constants  ----------------------------------------
const GET_ALL_POSTS = 'posts/GET_ALL_POSTS'
const GET_POST_DETAIL = 'posts/GET_POST_DETAIL'
const CREATE_POST = 'posts/CREATE_POST'
const UPDATE_POST = 'posts/UPDATE_POST'
const DELETE_POST = 'posts/DELETE_POST'

// ----------------------------------- action creators   ---------------------------------
const getAllPosts = (posts) => ({
	type: GET_ALL_POSTS,
	posts
})

const getPostById = (post) => ({
  type: GET_POST_DETAIL,
  post
})

const createPost = (post) => ({
  type: CREATE_POST,
  post
})

const updatePost = (post) => ({
  type: UPDATE_POST,
  post
})

const deletePost = (postId) => ({
  type: UPDATE_POST,
  postId
})


// ----------------------------------- thunks  ----------------------------------------

export const getAllPostsThunk = (userId) => async (dispatch) => {
	const response = await fetch(`/api/posts/${userId}/posts`)

	if (response.ok) {
    let data = await response.json()
		dispatch(getAllPosts(data))
    return data
	}
}

export const getPostDetailThunk = (id) => async (dispatch) => {
  console.log(' ------- get post detail thunk running -----')
  const response = await fetch(`/api/posts/${id}`)

  if (response.ok) {
    let data = await response.json()
    console.log('RESPONSE.OK!!!! ', data)
    dispatch(getPostById(data))
    return data
  }
}


export const createPostThunk = (formData) => async (dispatch) => {
  console.log('create post thunk running ---- form data is ' , formData)
  const res = await fetch(`/api/posts`, {
    method: "POST",
    body: formData,
  })

  if (res.ok) {
    let data = await res.json()
    console.log('RES.OK!!!!' , data)
    dispatch(createPost(data))
    return data
  }
}

export const updatePostThunk = (id, post) => async (dispatch) => {
  console.log('update post thunk running')
  const res = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post)
  })

  if (res.ok) {
    const data = await res.json()
    dispatch(updatePost(data))
    return data
  }
}

export const deletePostThunk = (postId) => async (dispatch) => {
  console.log('delete post thunk running')
  const response = await fetch(`/api/posts/${postId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })

  if (response.ok) {
    dispatch(deletePost(postId))
    return ('successfully deleted!')
  }

}


const initialState = { allPosts: {}, post: {} };

// ----------------------------------- Reducer  ----------------------------------------
export default function postReducer(state = initialState, action) {
  let newState = {}
	switch (action.type) {

    case GET_ALL_POSTS:
      newState = {...state, allPosts: {}, post: {...state.post}}
      action.posts.forEach(post => {
        newState.allPosts[post.id] = post
      });
      return newState;

    case GET_POST_DETAIL:
      newState = {...state, allPosts: {}, post: {}}
      newState.post = action.post
      return newState

    case CREATE_POST:
      newState = {...state, allPosts: {...state.allPosts}}
      newState.allPosts[action.post.id] = action.post
			return newState

    case UPDATE_POST:
      newState = {...state, allPosts: {...state.allPosts}}
      newState.post = action.post
		default:
			return state;
	}
}
