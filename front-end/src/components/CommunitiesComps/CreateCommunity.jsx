import { Button } from "../UI/Button"
import { Input } from "../UI/Input"
import { Label } from "../UI/Label"
import communityDefaultImage from '../../../public/assets/communityDefaultImage.png'
import { SuggestedCommunityOrUser } from "../layout/SingleComponents/SuggestedCommunityOrUser"
import { useEffect, useState } from "react"
import { searchUsers } from "../../services/suggesstionsServices"
import { LinearProgress } from "@mui/material"
import { createCommunity, sendCommunityInvitation } from "../../services/communityServices"
import { Notification } from "../UI/Notification"

export const CreateCommunity = ({handleCreateCommunity,setHandleCreateCommunity}) => {

    const [communityImage,setCommunityImage] = useState(null);
    const [communityDescription,setCommunityDescription] = useState('');
    const [communityMembers,setCommunityMembers] = useState([]);
    const [disableButton,setDisableButton] = useState(false);

    const userData = JSON.parse(localStorage.getItem("user"))

    const [query,setQuery] = useState('');
    const [users,setUsers] = useState([]);
    const [loading,setLoading] = useState(false);
    const [formLoading,setFormLoading] = useState(false);
    const [notification,setNotification] = useState({});

    const hanldeAddMember = (user) =>{
        if(!communityMembers.some((member) => member.username === user.username)){
            setCommunityMembers([...communityMembers,user]);
        }
    }

    const handleDeleteMembers = (id) =>{
        setCommunityMembers(communityMembers.filter((member,index) => index !== id))
    }

    const getSearchedUsers = async () =>{
        setLoading(true);
        const response = await searchUsers(localStorage.getItem("token"),query);
        setLoading(false)
        if(response.data.users){
          setUsers(response.data.users.slice(0,3))
        }
    }
    
    const hanldeSubmit = async (e) =>{
        e.preventDefault();
        setNotification(null);
        const data = new FormData();
        data.append("communityDescription",communityDescription);
        if(communityImage !== null){
            data.append("communityImage",communityImage);
        }
        
        setFormLoading(true);

        try {
            const response = await createCommunity(data,localStorage.getItem("token"));
            setFormLoading(false);
            console.log(response)

            if(response.data.created){
                setNotification({message:response.data.message,kind:"success"})

                const sendInvitationData = new FormData();
                sendInvitationData.append("posterUsername",userData.username);
                sendInvitationData.append("posterProfile",userData.profile_picture);
                sendInvitationData.append("communityId",response.data.community_id);
        
                
                communityMembers.forEach((member, index) => {
                    sendInvitationData.append(`communityMembers[${index}][id]`, member.id);
                });
                const response2 = await sendCommunityInvitation(sendInvitationData)
                setDisableButton(true);
            }
        } catch (error) {
            setFormLoading(false);
            if(error.response &&  error.response.data && error.response.data.message){
                setNotification({message:error.response.data.message,kind:"error"})
            }else{
                setNotification({message:"try again later",kind:"error"})
            }
        }
    }

    useEffect(() =>{
    if(query !== ''){
        getSearchedUsers();
        return;
    }
    setUsers([]);
    },[query])

  return (
    <div className="absolute top-16 text-black blur-none bg-white rounded-md p-5 w-[90%] lg:w-[40%] mx-auto">
        <h1 className="text-2xl font-semibold">Create Community</h1>
        <form onSubmit={hanldeSubmit}>
            <div className="mt-7 flex flex-col gap-5">
                <div className="flex flex-row gap-2 items-center">
                    <div>
                        <img src={communityDefaultImage} className="w-10 h-10 rounded-md" />
                    </div>
                    <div>
                        <p className="font-semibold">Default community image</p>
                        <input type="file" id="image" accept="image/png,image/jpeg" className="hidden" onChange={(e) => setCommunityImage(e.target.files[0])}/>
                        <label htmlFor="image" className="text-blue-500 font-semibold pr-5 cursor-pointer">Choose file</label>
                    </div>
                </div>
                <div>
                    <Label text='Community description'/>
                    <Input type='text' placeholder='Description of the community' value={communityDescription} onChange={(e) => setCommunityDescription(e.target.value)}/>
                </div>
                <div>
                    <Label text='Invite members'/>
                    <div className="flex flex-row gap-2 mb-4 flex-wrap">
                        {
                            communityMembers && communityMembers.length ?
                                communityMembers.map((communityMember,index) =>{
                                    return <>
                                            <div className="bg-gray-100 px-3 rounded-sm border-2 text-sm font-semibold cursor-pointer" onClick={() => handleDeleteMembers(index)}>
                                                <span>{communityMember.username}</span>
                                            </div>
                                        </>
                                })
                            :null
                        }
                    </div>
                    <Input type='text' required={false} placeholder='Search for members' value={query} onChange={(e) => setQuery(e.target.value)}/>
                    <div className="flex flex-col gap-1 mt-2">
                        {
                            loading && <LinearProgress />
                        }
                        {
                            users && users.length ?
                                users.map((user) =>{
                                    return <SuggestedCommunityOrUser user={user} addMember={true} onAddMember={hanldeAddMember}/>
                                })
                            :null
                        }
                        {
                            notification && <Notification text={notification.message} kind={notification.kind} />
                        }
                    </div>
                </div>
            </div>
            <div className="flex float-end gap-2 mt-5 w-[100%] lg:w-[70%]">
                <Button text='Cancel' color={'black'} bg={"bg-white border border-black"} onClick={() => setHandleCreateCommunity(!handleCreateCommunity)}/>
                <Button text='Create Community' loading={formLoading} disable={disableButton}/>
            </div>
        </form>
    </div>
  )
}
