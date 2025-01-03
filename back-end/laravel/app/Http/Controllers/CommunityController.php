<?php

namespace App\Http\Controllers;

use App\Models\Community;
use App\Models\CommunityMember;
use App\Models\CommunityUser;
use App\Models\Thread;
use App\Models\User;
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


                CommunityMember::create([
                    "user_id" => $user->id,
                    "community_id" => $community->id,
                    "role" => "admin"
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

            CommunityMember::create([
                "user_id" => $user->id,
                "community_id" => $community->id,
                "role" => "admin"
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
        $communities = User::where("id",$user->id)
                            ->with("communities")
                            ->latest()
                            ->get();

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
                                ->with("members")
                                ->first();

        $communityThreads = Thread::where("community_id",$communityId)
                                ->with("user")
                                ->get();

        return response()->json([
            "community" => $community,
            "communityThreads" => $communityThreads
        ]);
    }

    public function getCommunityMembers(Request $request){
        $members = Community::where("id",2)
                        ->with("members")
                        ->get();

        return response()->json([
            "members" => $members
        ]);
    }


    public function acceptCommunityInvitation(Request $request){
        try {
            $request->validate([
                "user_id" => "required",
            ]);

            CommunityMember::create([
                "user_id" => $request->user_id,
                "community_id" => $request->community_id,
                "role" => "member"
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
