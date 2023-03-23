
// ----------------------------------- constants  ----------------------------------------
const GET_ALL_POSTS = 'posts/GET_ALL_POSTS'
const CREATE_POST = 'posts/CREATE_POST'


// ----------------------------------- action creators   ---------------------------------
const getAllPosts = (posts) => ({
	type: GET_ALL_POSTS,
	posts
})

const createPost = (post) => ({
  type: CREATE_POST,
  post
})


// ----------------------------------- thunks  ----------------------------------------

export const getAllPostsThunk = () => async (dispatch) => {
  console.log('----- get all posts thunk running -----')
	const response = await fetch(`/api/posts`)

	if (response.ok) {
    let data = await response.json()
    console.log('RESPONSE.OK ----- data ', data )
		dispatch(getAllPosts(data))
    return data
	}
}

export const createPostThunk = (formData) => async (dispatch) => {
  console.log('------- create post thunk running ------- ')
  const res = await fetch(`/api/posts`, {
    method: "POST",
    body: formData,
  })

  if (res.ok) {
    let data = await res.json()
    console.log('------- response.OK!! ------- ', data)
    dispatch(createPost(data))
    return data
  }
}



const initialState = { allPosts: {}, post: {} };

// Reducer
export default function postReducer(state = initialState, action) {
  let newState = {}
	switch (action.type) {
		case GET_ALL_POSTS:
      newState = {...state, allPosts: {}, post: {...state.post}}
      action.posts.forEach(post => {
        newState.allPosts[post.id] = post
      });
      return newState;
    case CREATE_POST:
      newState = {...state, allPosts: {...state.allPosts}}
      newState.allPosts[action.post.id] = action.post
			return newState
		default:
			return state;
	}
}
