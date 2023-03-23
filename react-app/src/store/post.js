// ----------------------------------- constants  ----------------------------------------
const GET_ALL_POSTS = 'post/GET_ALL_POSTS'


// ----------------------------------- action creators   ---------------------------------
const getAllPosts = (posts) => ({
	type: GET_ALL_POSTS,
	posts
})


// ----------------------------------- thunks  ----------------------------------------

export const getAllPostsThunk = () => async (dispatch) => {
	const response = await fetch(`/api/posts`)

	if (response.ok) {
		let data = await response.json()
		dispatch(getAllPosts(data))
    return data
	}
}



const initialState = { allPosts: {}, post: {} };

// Reducer
export default function userReducer(state = initialState, action) {
  let newState = {}
	switch (action.type) {
		case GET_ALL_POSTS:
      newState = {...state}
      action.posts.forEach(post => {
        newState.allPosts[post.id] = post
      });
			return newState
		default:
			return state;
	}
}
