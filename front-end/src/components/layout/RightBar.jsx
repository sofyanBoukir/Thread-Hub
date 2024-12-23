import { SuggestedCommunityOrUser } from "./SingleComponents/SuggestedCommunityOrUser"

export const RightBar = () => {
  return (
    <div className="bg-dark w-[100%] pt-1 lg:flex hidden flex-col gap-2 h-screen px-3 ">
      <h1 className="text-xl font-semibold">Suggested Communities</h1>
      <div className="flex flex-col gap-2 h-screen mt-5">
        <SuggestedCommunityOrUser />
        <SuggestedCommunityOrUser />
        <SuggestedCommunityOrUser />
        <SuggestedCommunityOrUser />
      </div>
      <br></br>
      <br></br>
      <h1 className="text-xl font-semibold">Similar minds</h1>
      <div className="flex flex-col gap-2 h-screen mt-5">
        <SuggestedCommunityOrUser />
        <SuggestedCommunityOrUser />
        <SuggestedCommunityOrUser />
        <SuggestedCommunityOrUser />
      </div>
    </div>
  )
}
