import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPostDetailThunk } from "../../store/post";

import PostUpdate from "./index";

// container component to make sure that what you're passing into the update form gets populated correctly

export default function UpdatePostInfo() {

  const dispatch = useDispatch();
  let {postId} = useParams();

  useEffect(() => {
    dispatch(getPostDetailThunk(postId))
  }, [dispatch, postId])

  let post = useSelector(state => state.post.post);

  if (post.caption) {
    return (<PostUpdate postId={post}/>)
  } else {
    return (null)
  }

}
