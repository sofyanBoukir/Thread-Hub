import { Button } from "../UI/Button"
import { Input } from "../UI/Input"
import { Label } from "../UI/Label"
import communityImage from '../../../public/assets/communityDefaultImage.png'
import { SuggestedCommunityOrUser } from "../layout/SingleComponents/SuggestedCommunityOrUser"

export const CreateCommunity = ({handleCreateCommunity,setHandleCreateCommunity}) => {
  return (
    <div className="absolute top-20 text-black blur-none bg-white rounded-md p-5 w-[90%] lg:w-[40%] mx-auto">
        <h1 className="text-2xl font-semibold">Create Community</h1>
        <div className="mt-7 flex flex-col gap-5">
            <div className="flex flex-row gap-2 items-center">
                <div>
                    <img src={communityImage} className="w-10 h-10 rounded-md" />
                </div>
                <div>
                    <p className="font-semibold">Default community image</p>
                    <input type="file" id="image" accept="image/png,image/jpeg" className="hidden"/>
                    <label htmlFor="image" className="text-blue-500 font-semibold pr-5 cursor-pointer">Choose file</label>
                </div>
            </div>
            <div>
                <Label text='Community name'/>
                <Input type='text' placeholder='Name of the community'/>
            </div>
            <div>
                <Label text='Community members'/>
                <Input type='text' placeholder='Search for members'/>
                <div className="flex flex-col gap-1 mt-2">
                    <SuggestedCommunityOrUser addMember={true}/>
                    <SuggestedCommunityOrUser addMember={true}/>
                    <SuggestedCommunityOrUser addMember={true}/>
                </div>
            </div>
        </div>
        <div className="flex float-end gap-2 mt-5 w-[100%] lg:w-[70%]">
            <Button text='Cancel' bg={"bg-white text-black border border-black"} onClick={() => setHandleCreateCommunity(!handleCreateCommunity)}/>
            <Button text='Create Community'/>
        </div>
    </div>
  )
}
