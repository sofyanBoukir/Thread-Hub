<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Community extends Model
{
    public function user(){
        return $this->belongsTo(User::class);
    }

    public function threads(){
        return $this->hasMany(Thread::class);
    }

}
