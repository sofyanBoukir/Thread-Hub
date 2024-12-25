<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\Rule;
use Tymon\JWTAuth\Facades\JWTAuth;

class ProfileController extends Controller
{
    public function editProfile(Request $request){
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $request->validate([
                "full_name" => 'string | max:30',
                "username" => [
                    "string",
                    Rule::unique('users','username')->ignore($user->id),
                ],
                "bio" => 'string | max:255',
            ]);

            if($request->hasFile("image")){
                $request->validate([
                    "image" => 'mimes:jpeg,jpg,png | max:2048'
                ]);

                $image_path = $user->profile_picture;
                $relativePath = parse_url($image_path, PHP_URL_PATH);
                $filePath = public_path($relativePath);
                
                if(File::exists($filePath)) {
                    File::delete($filePath);
                }

                $file = $request->file("image");
                $fileName = time()."_".$file->getClientOriginalName();
                $file->move('storage/users',$fileName);
                $user->profile_picture = $fileName;
            }

            $user->full_name = $request->full_name;
            $user->username = $request->username;
            $user->bio = $request->bio;
            $user->save();
            return response()->json([
                "updated" => true,
                "message" => "Profile updated successfully",
                "user" => $user,
            ]);

        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage()
            ], 500);
        }
    }
}
