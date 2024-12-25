<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::prefix("auth")->group(function(){
    Route::post("/checkUserLogin",[AuthController::class,'checkUserLogin']);
    Route::post("/sendVerificationCode",[AuthController::class,'sendVerificationCode']);
    Route::post("/checkVerificationCode",[AuthController::class,'checkVerificationCode']);
    Route::post("/forgotPassword",[AuthController::class,'forgotPassword']);
    Route::post("/resetPassword",[AuthController::class,"resetPassword"]);
});

Route::prefix("profile")->group(function(){
    Route::post("/editProfile",[ProfileController::class,"editProfile"]);
});
