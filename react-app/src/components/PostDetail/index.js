import React, { useEffect }  from "react"
import { useSelector, useDispatch } from "react-redux"
import { getPostDetailThunk } from "../../store/post"
import { useParams } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default function PostDetail() {
  const dispatch = useDispatch()
  const {id} = useParams()
  console.log('id is...', id)

  const post = useSelector(state => state.post.post)
  console.log('post is working???', post)

  useEffect(() => {
    dispatch(getPostDetailThunk(id))
  }, [dispatch])

  const commentsArr = post?.comments
  console.log('commentsArr', commentsArr)



  return (
    <>
    <div> TESTING </div>
    <FontAwesomeIcon icon={faGear} />
    <FontAwesomeIcon icon={faBars} />
    <i class="fa-solid fa-gear" />
    <img src={post.user?.profilePic} alt='userimage'/>
    <div> {post.user?.firstName} {post.user?.lastName} </div>
    <div> {post.caption} </div>
    <img src={post.photo} />
    <div>
      {commentsArr?.map(comment => {
        return (
          <div key={`comment${comment.id}`}>
          <img src={comment.user.profilePic} />

          <div> {comment.user.firstName} {comment.user.lastName} </div>
          <div> {comment.comment} </div>
          </div>
        )
      })}
    </div>
    </>
  )
}
