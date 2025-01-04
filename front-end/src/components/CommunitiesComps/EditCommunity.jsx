import { Button } from "../UI/Button"
import { Input } from "../UI/Input"
import { Label } from "../UI/Label"
import { UserPlusIcon } from "@heroicons/react/24/solid"
import imageTest from '../../../public/assets/testImage.png'
import { TrashIcon } from "@heroicons/react/24/outline"
import { SuggestedCommunityOrUser } from "../layout/SingleComponents/SuggestedCommunityOrUser"
import { useEffect, useState } from "react"
import { getMembers } from "../../services/communityServices"
import { CircularProgress } from "@mui/material"
import moment from "moment"
export const EditCommunity = ({community,handleEditCommunity,setHandleEditCommunity}) => {
    
    const [openInviteMembers,setOpenInviteMembers] = useState(false);
    const [communityMembers,setCommunityMembers] = useState([]);
    const [membersLoading,setMembersLoading] = useState(false);

    const getCommunityMembers = async () =>{
        setMembersLoading(true);
        const response = await getMembers(community.id);
        setMembersLoading(false);
        if(response.data.members){
            setCommunityMembers(response.data.members[0].members);
            console.log(response.data.members[0].members);
        }
    }
    useEffect(() =>{
        getCommunityMembers();
    },[])
  return (
    <div className="absolute top-20 text-black blur-none bg-white rounded-md p-5 w-[90%] lg:w-[50%] mx-auto">
        <div className="flex flex-row items-center justify-between">
            <h1 className="text-2xl font-semibold">Edit Community</h1>
            <button className="bg-blue-700 text-white px-3 py-1 rounded-sm flex gap-1 items-center" onClick={() =>setOpenInviteMembers(true)}>
                <UserPlusIcon className="w-6 h-6" strokeWidth={1}/>
                <span className="font-semibold">Invite</span>
            </button>
        </div>
        <div className="mt-7 flex flex-col gap-5">
            <div>
                <Label text={"Community name"}/>
                <Input type='text' placeholder={community.description}/>
            </div>
            {
                openInviteMembers ? 
                <div>
                    <Label text='Invite members'/>
                    <div className="flex flex-row gap-2 mb-4 flex-wrap">
                        <div className="bg-gray-100 px-3 rounded-sm border-2 text-sm font-semibold">
                            <span>sof1_boukir</span>
                        </div>
                        <div className="bg-gray-100 px-3 rounded-sm border-2 text-sm font-semibold">
                            <span>sof1_boukir</span>
                        </div>
                        <div className="bg-gray-100 px-3 rounded-sm border-2 text-sm font-semibold">
                            <span>sof1_boukir</span>
                        </div>
                        <div className="bg-gray-100 px-3 rounded-sm border-2 text-sm font-semibold">
                            <span>sof1_boukir</span>
                        </div>
                        <div className="bg-gray-100 px-3 rounded-sm border-2 text-sm font-semibold">
                            <span>sof1_boukir</span>
                        </div>
                        <div className="bg-gray-100 px-3 rounded-sm border-2 text-sm font-semibold">
                            <span>sof1_boukir</span>
                        </div>
                    </div>
                    <Input type='text' placeholder='Search for members'/>
                    <div className="flex flex-col gap-1 mt-2">
                        <SuggestedCommunityOrUser addMember={true}/>
                        <SuggestedCommunityOrUser addMember={true}/>
                        <SuggestedCommunityOrUser addMember={true}/>
                    </div>
                </div>
                :null
            }
            <div>
                <Label text={"Community members"}/>
                <div className="flex justify-center">
                    {
                        membersLoading && <CircularProgress />
                    }
                </div>
                <div className="h-40 overflow-auto">
                    <table className="w-full border-2 rounded-sm border-gray-300 table-auto">
                        <thead>
                            <tr>
                                <th className="px-3 py-1 text-gray-600 font-semibold">User</th>
                                <th className="px-3 py-1 text-gray-600 font-semibold">Joined at</th>
                                <th className="px-3 py-1 text-gray-600 font-semibold">Role</th>
                                <th className="px-3 py-1 text-gray-600 font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                communityMembers && communityMembers.length?
                                    communityMembers.map((member) =>{
                                        return <tr>
                                                    <td className="p-2">
                                                    <div className="flex gap-2 items-center">
                                                            <div>
                                                                <img src={member.profile_picture} alt="profile" className="w-14 h-14 rounded-full"/>
                                                            </div>
                                                            <div>
                                                                <h1 className="text-lg font-semibold">{member.full_name}</h1>
                                                                <span className="font-semibold text-sm text-gray-500">@{member.username}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-2 text-center font-semibold">{moment(member.pivot.created_at).format("DD-MM-YYYY")}</td>
                                                    <td className="p-2 text-center">
                                                        <span>{member.pivot.role}</span>
                                                    </td>
                                                    <td className="p-2 flex justify-center mt-2">
                                                        <TrashIcon className="text-red-600 w-8 h-8"/>
                                                    </td>
                                                </tr>
                                    })
                                :null
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div className="flex float-end gap-2 mt-5 w-[100%] lg:w-[50%]">
            <Button text='Cancel' color={'black'} bg={"bg-white border border-black"} onClick={() => setHandleEditCommunity(!handleEditCommunity)}/>
            <Button text='Save'/>
        </div>
    </div>
  )
}
