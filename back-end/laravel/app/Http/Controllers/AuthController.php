<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Mockery\Generator\StringManipulation\Pass\Pass;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function checkUserLogin(Request $request){
        $credentials = $request->only(['email','password']);
        if(!$token = JWTAuth::attempt($credentials)){
            return response()->json([
                'loggedIn' => false,
                'message' => 'Invalid credentials',
            ]);
        }

        return response()->json([
            'loggedIn' => true,
            'token' => $token,
            'user' => Auth::user(),
        ]);
    }

    public function sendVerificationCode(Request $request){
        try {
            $email = $request->email;
            $userExists = User::where('email',$email)->exists();
            if($userExists){
                return response()->json([
                    "userExists" => true,
                    'message' => "User associed with this email already exists!",
                ]);
            }
            $firstName = $request->firstName;
            $verification_code = rand(100000,999999);

            DB::table("verification_codes")->insert([
                "email" => $request->email,
                "verification_code" => $verification_code,
                "expires_at" => now()->addMinutes(5),
            ]);

            Mail::send("emails.verification",['code' => $verification_code, 'firstName' => $firstName],function($message) use ($email){
                $message->to($email)->subject("Verification code");
            });

            return response()->json([
                "sended" => true,
            ]);

        } catch (Exception $ex) {
            return response()->json([
                "sended" => false,
                "message" => $ex->getMessage(),
            ]);
        }
    }

    public function checkVerificationCode(Request $request){
        $firstName = $request->firstName;
        $lastName = $request->lastName;
        $email = $request->email;
        $code = $request->verificationCode;
        $password = $request->password;

        $verify_code = DB::table("verification_codes")->where("email",$email)
                            ->where("verification_code",$code)
                            ->where("expires_at",">",now())
                            ->first();

        if($verify_code){
            User::create([
                "full_name" => $firstName .' '. $lastName,
                "email" => $email,
                "email_verified_at" => now(),
                "password" => Hash::make($password),
            ]);

            return response()->json([
                "registred" => true,
            ]);
        }

        return response()->json([
            "registred" => false,
            "message" => "Incorrect code or expired!",
        ]);
    }

    public function forgotPassword(Request $request){
        $userExists = User::where("email",$request->email)->exists();

        if(!$userExists){
            return response()->json([
                "userExists" => false,
                "message" => "User not exist!",
            ]);
        }

        $status = Password::sendResetLink($request->only('email'));
        if($status === Password::RESET_LINK_SENT){
            return response()->json([
                "sended" => true,
                "message" => __($status)
            ]);
        }

        return response()->json([
            "sended" => false,
            "message" => __($status),
        ]);
    }

    public function resetPassword(Request $request){
        $status = Password::reset(
            $request->only("email","password","retype_password","token"),
            function($user,$password){
                $user->password = Hash::make($password);
                $user->save();
            }
        );

        if($status === Password::PASSWORD_RESET){
            return response()->json([
                "reseted" => true,
                "message" => __($status)
            ]);
        }
        return response()->json([
            "reseted" => false,
            "message" => __($status)
        ]);
    }
}
