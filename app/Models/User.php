<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $fillable = [
        'name',
        'username',
        'email',
        'password'
    ];
    protected $hidden = [
        'password'
    ];

    public function cart(){
        return $this->belongstoMany(Item::class,"cart","user_id","item_id");
    }

    public function saved_items(){
        return $this->belongstoMany(Item::class,"saved_item","user_id","item_id");
    }
}
