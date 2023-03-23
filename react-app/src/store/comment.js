
// ----------------------------------- constants  ----------------------------------------
const GET_ALL_COMMENTS = 'comments/GET_ALL_COMMENTS'
const CREATE_COMMENT = 'comments/CREATE_COMMENT'


// ----------------------------------- action creators   ---------------------------------
const getAllComments = (comments) => ({
	type: GET_ALL_COMMENTS,
	comments
})

const createComment = (comment) => ({
  type: CREATE_COMMENT,
  comment
})


// ----------------------------------- thunks  ----------------------------------------

export const getAllCommentsThunk = (postId) => async (dispatch) => {
  console.log('----- get all comments thunk running -----')
	const response = await fetch(`/api/comments/${postId}/comments`)

	if (response.ok) {
    let data = await response.json()
    console.log('response ok from get all comments thunk!', data)
		dispatch(getAllComments(data))
    return data
	}
}

export const createCommentThunk = (comment) => async (dispatch) => {

  const res = await fetch(`/api/comments`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment),
  })

  if (res.ok) {
    let data = await res.json()
    dispatch(createComment(data))
    return data
  }
}



const initialState = { };

// ----------------------------------- Reducer  ----------------------------------------
export default function commentReducer(state = initialState, action) {
  let newState = {}
	switch (action.type) {
		case GET_ALL_COMMENTS:
      newState = { }
      action.comments.forEach(comment => {
        newState[comment.id] = comment
      });
      return newState;
    case CREATE_COMMENT:
      newState = {...state }
      newState[action.comment.id] = action.comment
			return newState
		default:
			return state;
	}
}
