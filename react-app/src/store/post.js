
// ----------------------------------- constants  ----------------------------------------
const GET_ALL_POSTS = 'posts/GET_ALL_POSTS'
const CREATE_POST = 'posts/CREATE_POST'
const GET_POST_DETAIL = 'posts/GET_POST_DETAIL'


// ----------------------------------- action creators   ---------------------------------
const getAllPosts = (posts) => ({
	type: GET_ALL_POSTS,
	posts
})

const getPostById = (post) => ({
  type: GET_ALL_POSTS,
  post
})

const createPost = (post) => ({
  type: CREATE_POST,
  post
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
  const res = await fetch(`/api/posts`, {
    method: "POST",
    body: formData,
  })

  if (res.ok) {
    let data = await res.json()
    dispatch(createPost(data))
    return data
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
		default:
			return state;
	}
}
