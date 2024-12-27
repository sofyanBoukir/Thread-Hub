<?php

namespace App\Http\Controllers;

use App\Models\Community;
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

                Community::create([
                    "user_id" => $user->id,
                    "description" => $request->communityDescription,
                    "picture" => $fileName,
                    "role" => "admin",
                ]);

                if($request->has("communityMembers")){
                    foreach($request->communityMembers as $member){
                        Community::create([
                            "user_id" => $member['id'],
                            "description" => $request->communityDescription,
                            "role" => "member",
                        ]);
                    }
                }

                return response()->json([
                    "created" => true,
                    "message" => "New community created successfully!",
                ]);
            }

            Community::create([
                "user_id" => $user->id,
                "description" => $request->communityDescription,
                "role" => "admin",
            ]);

            if($request->has("communityMembers")){
                foreach($request->communityMembers as $member){
                    Community::create([
                        "user_id" => $member['id'],
                        "description" => $request->communityDescription,
                        "role" => "member",
                    ]);
                }
            }
            return response()->json([
                "created" => true,
                "message" => "New community created successfully!",
            ]);


        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage(),
            ]);
        }
    }
}
