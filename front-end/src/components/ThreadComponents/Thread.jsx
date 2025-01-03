import { ChatBubbleOvalLeftEllipsisIcon, HeartIcon, ShareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { Comment } from './Comment'
import { Button } from '../UI/Button'
import moment from 'moment'
import { deleteComment, getThreadComments, postComment } from '../../services/commentServices'
import { Notification } from '../UI/Notification'
import { CircularProgress } from '@mui/material'
import { deleteThread } from '../../services/threadServices'
import { postCommentNotification } from '../../services/notificationsServices'
import { Link } from 'react-router-dom'
export const Thread = ({thread}) => {
    const [handleComments,setHandleComments] = useState(false);
    const [comment,setComment] = useState('');
    const [comments,setComments] = useState([]);
    const [loading,setLoading] = useState(false);
    const [commentsLoading,setCommentsLoading] = useState(false);
    const [notification,setNotification] = useState(false);
    const userData = JSON.parse(localStorage.getItem("user"));
    const [deleteLoading,setDeleteLoading] = useState(false);

    const handleDeleteComment = async (commentId) =>{
        const response = await deleteComment(commentId);
        await getComments()
    }

    const handleDeleteThread = async () =>{
        setNotification(null)
        setDeleteLoading(true);
        try{
            const response = await deleteThread(thread.id,localStorage.getItem("token"));
            setDeleteLoading(false)
            if(response.data.deleted){
                setNotification({kind:"success",message:response.data.message});
            }
        }catch(error){
            setDeleteLoading(false);
            if(error.response.data.message){
                setNotification({kind:"error",message:error.response.data.message});
            }else{
                setNotification({kind:"error",message:"Try again later"});
            }
        }
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setNotification(null);
        setLoading(true);
        const formData = new FormData();
        formData.append("threadId",thread.id)
        formData.append("posterUsername",userData.username)
        formData.append("posterProfile",userData.profile_picture)
        formData.append("content",comment)
        
        try {
            const response = await postComment(formData);
            formData.append("receiverId",thread.user.id);
            const response2 = await postCommentNotification(formData);
            
            setLoading(false);

            if(response.data.posted){
                setNotification({message:response.data.message,kind:"success"})
                await getComments();
                setComment('');
            }
        } catch (error) {
            setLoading(false);
            if(error.response.data.message){
                setNotification({message:error.response.data.message,kind:"error"});
            }else{
                setNotification({message:"Try again later",kind:"error"});
            }
        }
    }

    const getComments = async ()=>{
        setCommentsLoading(true);
        const response = await getThreadComments(thread.id);
        setCommentsLoading(false);
        if(response.data.comments){
            setComments(response.data.comments);
        }
    }
    useEffect(() =>{
        getComments();
    },[])
  return (
        <div className='w-[95%] rounded-sm bg-dark px-3 py-2 font-sans'>
            <div className='flex flex-row gap-2'>
                <img src={thread.user.profile_picture} className='w-10 h-10 rounded-full'/>
                <div>
                    <h1 className='text-lg font-semibold'>{thread.user.full_name}</h1>
                        <span className='text-sm'>{thread.title}</span>
                </div>
            </div>
            <div className='ml-10 mt-4 flex gap-2 items-center'>
                <HeartIcon className='text-gray-500 h-6 w-6 cursor-pointer' strokeWidth={1}/>
                <ChatBubbleOvalLeftEllipsisIcon className='text-gray-500 h-6 w-6 cursor-pointer' strokeWidth={1} onClick={() => setHandleComments(!handleComments)}/>
                {
                    userData.username === thread.user.username &&
                    <>
                        {
                            !deleteLoading ?
                                <TrashIcon className='text-gray-500 h-6 w-6 cursor-pointer' strokeWidth={1} onClick={handleDeleteThread}/>
                            : <CircularProgress size={"24px"} color='white'/>
                        }
                    </>                       
                }
            </div>      
            <div className='mt-2 flex gap-10'>
                <p className={`text-xs font-semibold text-gray-500 ${handleComments?'hidden':null}`}>{moment(thread.created_at).fromNow()}</p>
                {
                    thread.community?
                        <div className='flex items-center gap-2'>
                            <img src={thread.community.picture} className='w-5 h-5 rounded-full'/>
                            <Link className='text-gray-700 text-sm font-semibold' to={`/communities/community/${thread.community.id}`}>{thread.community.description}</Link>
                        </div>
                    :null
                }
            </div>
            {
                handleComments?
                <div className='flex flex-col gap-2 mx-10 mt-4 w-[90%]'>
                        <form onSubmit={handleSubmit} className='flex flex-row gap-2 mb-2 items-center'>
                            <input type='text' placeholder='Add a comment' required
                            value={comment} onChange={(e) => setComment(e.target.value)}
                            className='bg-dark text-gray-500 px-3 py-2 rounded-md outline-none w-[90%] border-2 border-gray-800'/>
                            <Button text={'Reply'} width={"10%"} loading={loading}/>
                        </form>
                    {
                        commentsLoading && <CircularProgress size={"30px"} className='mx-auto'/>
                    }
                    <div className={`${comments.length ?' h-40 ':null} overflow-auto`}>
                        {
                            comments && comments.length ?
                                comments.map((comment) =>{
                                    return <Comment comment={comment} deleteComment={handleDeleteComment}/>
                                })
                            :<span className='flex justify-center font-semibold'>Be the first to comment on this thread!</span>
                        }
                    </div>
                </div>
                :null
            }
            {
                notification && <Notification kind={notification.kind} text={notification.message} />
            }
        </div>
    ) 
}
