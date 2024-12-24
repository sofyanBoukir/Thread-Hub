import { Button } from "../UI/Button"
import { Input } from "../UI/Input"
import { Label } from "../UI/Label"
import { UserPlusIcon } from "@heroicons/react/24/solid"
import imageTest from '../../../public/assets/testImage.png'
import { TrashIcon } from "@heroicons/react/24/outline"
import { SuggestedCommunityOrUser } from "../layout/SingleComponents/SuggestedCommunityOrUser"
import { useState } from "react"
export const EditCommunity = ({handleEditCommunity,setHandleEditCommunity}) => {
    const [openInviteMembers,setOpenInviteMembers] = useState(false);
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
                <Input type='text' placeholder='Name of the community'/>
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
                <table className="w-full table-auto border-2 rounded-sm border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-3 py-1 text-gray-600 font-semibold">User</th>
                            <th className="px-3 py-1 text-gray-600 font-semibold">Joined at</th>
                            <th className="px-3 py-1 text-gray-600 font-semibold">Role</th>
                            <th className="px-3 py-1 text-gray-600 font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-2">
                               <div className="flex gap-2 items-center">
                                    <div>
                                        <img src={imageTest} alt="profile" className="w-14 h-14 rounded-full"/>
                                    </div>
                                    <div>
                                        <h1 className="text-lg font-semibold">Soufian boukir</h1>
                                        <span className="font-semibold text-sm text-gray-500">@soufian1_bo</span>
                                    </div>
                                </div>
                            </td>
                            <td className="p-2 text-center font-semibold">13-11-2024</td>
                            <td className="p-2 text-center">
                                <select className="bg-gray-100 cursor-pointer font-semibold px-3 py-2 border border-gray-400 rounded-sm">
                                    <option>Admin</option>
                                    <option>Member</option>
                                </select>
                            </td>
                            <td className="p-2 flex justify-center mt-2">
                                <TrashIcon className="text-red-600 w-8 h-8"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="flex float-end gap-2 mt-5 w-[100%] lg:w-[50%]">
            <Button text='Cancel' color={'black'} bg={"bg-white border border-black"} onClick={() => setHandleEditCommunity(!handleEditCommunity)}/>
            <Button text='Save'/>
        </div>
    </div>
  )
}
