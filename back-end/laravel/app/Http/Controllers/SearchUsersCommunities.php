<?php

namespace App\Http\Controllers;

use App\Models\Community;
use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class SearchUsersCommunities extends Controller
{
    public function getSearchedQuery(Request $request){
        $user = JWTAuth::parseToken()->authenticate();
        $users = User::where("id","!=",$user->id)
                        ->where("username","LIKE",'%'. $request->searchedQuery .'%')
                        ->limit(6)
                        ->get();

        return response()->json([
            "users" => $users,
        ]);
    }
}
