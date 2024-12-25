<?php

namespace App\Http\Controllers;

use App\Models\Community;
use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class SuggestionsController extends Controller
{
    public function suggestionUsers(){
        $user = JWTAuth::parseToken()->authenticate();
        $suggestionUsers = User::where("id","!=",$user->id)
                            ->inRandomOrder()
                            ->limit(4)
                            ->get();
        return response()->json([
            "suggestionUsers" => $suggestionUsers
        ]);
    }

    public function suggestionCommunities(){
        $user = JWTAuth::parseToken()->authenticate();
        $suggestionCommunities = Community::where("user_id","!=",$user->id)
                            ->inRandomOrder()
                            ->limit(4)
                            ->get();
        return response()->json([
            "suggestionCommunities" => $suggestionCommunities
        ]);
    }
}
