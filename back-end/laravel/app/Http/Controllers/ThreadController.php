<?php

namespace App\Http\Controllers;

use App\Models\Community;
use App\Models\Thread;
use Exception;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class ThreadController extends Controller
{
    public function createThread(Request $request){
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $request->validate([
                "thread" => "required|string|max:2000",
            ]);
            Thread::create([
                "user_id" => $user->id,
                "community_id" => $request->communityId ? $request->communityId: null,
                "title" => $request->thread,
            ]);

            return response()->json([
                "created" => true,
                "message" => "new Thread posted!",
            ]);
        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage(),
            ]);
        }
    }

    public function getHomeThreads(){
        $homeThreads = Thread::with("user")
                            ->latest()->get();

        return response()->json([
            "threads" => $homeThreads,
        ]);
    }

    public function getUserThreads(Request $request){
        try {
             $threads = Thread::where("user_id",$request->id)
                            ->with("user")
                            ->latest()->get();

            return response()->json([
                "threads" => $threads,
            ]);
        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage(),
            ]);
        }
    }

    public function deleteThread($threadId){
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $thread = Thread::where("user_id",$user->id)
                                ->where("id",$threadId)
                                ->first();

            if($thread){
                $thread->delete();
                return response()->json([
                    "deleted" => true,
                    "message" => "Thread deleted successfully!"
                ]);
            }
        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage(),
            ],500);
        }
    }
}
