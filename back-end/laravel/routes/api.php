<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommunityController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchUsersCommunities;
use App\Http\Controllers\SuggestionsController;
use App\Http\Controllers\ThreadController;
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
    Route::get("/viewUserData",[ProfileController::class,"getUserData"]);
});

Route::prefix("suggestions")->group(function(){
    Route::get("/suggestionUsers",[SuggestionsController::class,"suggestionUsers"]);
    Route::get("/suggestionCommunities",[SuggestionsController::class,"suggestionCommunities"]);
});

Route::get('/searchUsers',[SearchUsersCommunities::class,"getSearchedQuery"]);


Route::prefix("thread")->group(function(){
    Route::post("/postThread",[ThreadController::class,"createThread"]);
    Route::get("/getUserThreads",[ThreadController::class,"getUserThreads"]);
    Route::get("/getHomeThreads",[ThreadController::class,"getHomeThreads"]);
    Route::delete("/deleteThread/{threadId}",[ThreadController::class,"deleteThread"]);
    Route::get("/getSingleThread",[ThreadController::class,"getSingleThread"]);
});

Route::prefix("community")->group(function(){
    Route::post("/createCommunity",[CommunityController::class,"createCommunity"]);
    Route::get("/userCommunities",[CommunityController::class,"getUserCommunities"]);
});
