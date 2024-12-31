<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Community extends Model
{
    protected $fillable =[
        "user_id",
        "description",
        "picture",
        "role",
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function threads(){
        return $this->hasMany(Thread::class);
    }

    public function getPictureAttribute($value){
        return $value ?
          asset('storage/communities/' . $value)
        : asset('storage/communities/communityDefaultImage.png');
    }

}
