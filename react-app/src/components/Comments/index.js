import React,{ useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllCommentsThunk } from "../../store/comment";


export default function AllComments({postId}) {
  const dispatch = useDispatch();

  const allComments = useSelector(state => state.comment);
  console.log('all comments... is it properly filtering per post?', allComments)

  useEffect(() => {
    dispatch(getAllCommentsThunk(postId))
  }, [dispatch])

  let commentsArr;
    if (!allComments) return null;
    else commentsArr = Object.values(allComments);
    // console.log('commentsArr!!!!', commentsArr)


  return (
    <>
      {commentsArr.map(comment => {
        return (
          <div key={`postcomment${comment.id}`}>
            <img src={comment.user.profilePic} alt='profilepic'/>
            <div>
              <div> {comment.comment} </div>
              <div> {comment.user.firstName} {comment.user.lastName} </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
