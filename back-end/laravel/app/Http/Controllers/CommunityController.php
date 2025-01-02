<?php

namespace App\Http\Controllers;

use App\Models\Community;
use App\Models\CommunityUser;
use App\Models\Thread;
use Exception;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class CommunityController extends Controller
{
    public function createCommunity(Request $request){
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $request->validate([
                "communityDescription" => "string|max:100",
            ]);

            if($request->hasFile("communityImage")){
                $request->validate([
                    "communityImage" => "image|mimes:png,jpg,jpeg|max:2048",
                ]);

                $file = $request->file("communityImage");
                $fileName = time()."_".$file->getClientOriginalName();
                $file->move('storage/communities',$fileName);

                $community = Community::create([
                    "description" => $request->communityDescription,
                    "picture" => $fileName,
                ]);

                return response()->json([
                    "created" => true,
                    "message" => "New community created successfully!",
                    "community_id" => $community->id,
                ]);
            }

            $community = Community::create([
                "description" => $request->communityDescription,
            ]);

            return response()->json([
                "created" => true,
                "message" => "New community created successfully!",
                "community_id" => $community->id,
            ]);


        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage(),
            ]);
        }
    }


    public function getUserCommunities(){
        $user = JWTAuth::parseToken()->authenticate();
        $communities = Community::where("user_id",$user->id)
                                        ->with("user")->get();
        if(count($communities)){
            return response()->json([
                "communities" => $communities,
            ]);
        }

        return response()->json([
            "message" => "no communities with this user!"
        ]);
    }

    public function getCommunityData(Request $request){
        $communityId = $request->query('communityId');
        $community = Community::where("id",$communityId)
                                ->with("user")
                                ->first();

        $communityThreads = Thread::where("community_id",$communityId)
                                ->with("user")
                                ->get();

        return response()->json([
            "community" => $community,
            "communityThreads" => $communityThreads
        ]);
    }

    public function acceptCommunityInvitation(Request $request){
        try {
            $request->validate([
                "user_id" => "required",
            ]);

            CommunityUser::create([
                "user_id" => $request->userId,
                "community_id" => $request->communityId,
            ]);

            return response()->json([
                "message" => "Accepted successfully!",
            ],200);

        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage(),
            ],500);
        }

    }
}
