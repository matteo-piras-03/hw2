<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $table = "item";
    public $timestamps = false;
    public function cart(){
        return $this->belongstoMany(User::class,"cart","item_id","user_id");
    }
}
