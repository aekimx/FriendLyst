// ----------------------------------- constants  ----------------------------------------
const GET_ALL_POSTS = 'posts/GET_ALL_POSTS'
const GET_POST_DETAIL = 'posts/GET_POST_DETAIL'
const CREATE_POST = 'posts/CREATE_POST'
const UPDATE_POST = 'posts/UPDATE_POST'
const DELETE_POST = 'posts/DELETE_POST'
const CREATE_COMMENT = 'posts/CREATE_COMMENT'
const UPDATE_COMMENT = 'posts/UPDATE_COMMENT'
const DELETE_COMMENT = 'posts/DELETE_COMMENT'
const LIKE_POST = 'posts/LIKE_POST'
const UNLIKE_POST = 'posts/UNLIKE_POST'

const CLEAR_POST = 'posts/CLEAR_POST'

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
  type: DELETE_POST,
  postId
})

const createComment = (comment) => ({
  type: CREATE_COMMENT,
  comment
})

const updateComment = (comment) => ({
  type: UPDATE_COMMENT,
  comment
})

const deleteComment = (comment) => ({
  type: DELETE_COMMENT,
  comment
})

const likePost = (like) => ({
  type: LIKE_POST,
  like
})

const unlikePost = (like) => ({
  type: UNLIKE_POST,
  like
})

export const clearPost = () => ({
  type: CLEAR_POST
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
  const response = await fetch(`/api/posts/${id}`)

  if (response.ok) {
    let data = await response.json()
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


export const updatePostThunk = (post, id) => async (dispatch) => {
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


export const deletePostThunk = ({postId}) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })

  if (response.ok) {
    dispatch(deletePost(postId))
    return ('successfully deleted!')
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


export const updateCommentThunk = (comment, commentId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${commentId}`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment),
  })

  if (res.ok) {
    let data = await res.json()
    dispatch(updateComment(data))
    return data
  }
}


export const deleteCommentThunk = (comment) => async (dispatch) => {
  const res = await fetch(`/api/comments/${comment.id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })

  if (res.ok) {
    dispatch(deleteComment(comment))
    return ('successfully deleted!')
  }
}


export const likePostThunk = (like) => async (dispatch) => {
  const res = await fetch(`/api/posts/${like.postId}/like`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(like)
  })

  if (res.ok) {
    let data = await res.json()
    dispatch(likePost(data))
    return data
  }
}


export const unlikePostThunk = (like) => async (dispatch) => {
  const res = await fetch(`/api/posts/like/${like.id}`, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' },
  })

  if (res.ok) {
    dispatch(unlikePost(like))
    return
  }
}

const initialState = { allPosts: {}, post: {} };

// ----------------------------------- Reducer  ----------------------------------------
export default function postReducer(state = initialState, action) {
  let newState = {}
	switch (action.type) {

    case GET_ALL_POSTS:
      newState = {...state, allPosts: {}, post: {...state.post}};
      action.posts.forEach(post => {
        newState.allPosts[post.id] = post
      });
      return newState;

    case GET_POST_DETAIL:
      newState = {...state, allPosts: {}, post: {}};
      newState.post = action.post;
      return newState;

    case CREATE_POST:
      newState = {...state, allPosts: {...state.allPosts}};
      newState.allPosts[action.post.id] = action.post;
			return newState;

    case UPDATE_POST:
      newState = {...state, allPosts: {...state.allPosts}};
      newState.allPosts[action.post.id] = action.post;
			return newState;

    case DELETE_POST:
      newState = {...state, allPosts: {...state.allPosts}};
      delete newState.allPosts[action.postId];
      return newState;

    case CREATE_COMMENT, UPDATE_COMMENT:
      newState = {...state};
      newState.allPosts[action.comment.postId].comments[action.comment.id] = action.comment;
      return newState;

    case DELETE_COMMENT:
      newState = {...state, allPosts: {...state.allPosts}};
      let index;
      for (let i=0; i < newState.allPosts[action.comment.postId].comments.length; i++) {
        let comment = newState.allPosts[action.comment.postId].comments[i];
        if (comment?.id === action.comment.id) index = i;
      }
      delete newState.allPosts[action.comment?.postId].comments[index];
      return newState;

    case LIKE_POST:
      newState = {...state, allPosts: {...state.allPosts}};
      newState.allPosts[action.like.postId].likes.push(action.like);
      return newState;

    case UNLIKE_POST:
      newState = {...state, allPosts: {...state.allPosts}};
      const newLikes = newState.allPosts[action.like.postId].likes.filter(like => like.id !== action.like.id)
      newState.allPosts[action.like.postId].likes = newLikes
      return newState;

    case CLEAR_POST:
      newState = {...state, post: {...state.post}}
      newState.post = {}
      return newState;

		default:
			return state;
	}
}
