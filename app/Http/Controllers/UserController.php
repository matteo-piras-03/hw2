<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function get_cart(){
        if(!session("id")){
            return [];
        }
        $user = User::find(session("id"));
        return $user->cart()->select("item.id", "item.item_id", "title", DB::raw("FORMAT(price,2) AS price"), DB::raw("FORMAT(shipping,2) AS shipping"), "src")->get();
    }

    public function add_cart_item(Request $request){
        if(!session("id") || empty($request->item_id)){
            return -1;
        }
        $user = User::find(session("id"));
        if(!$user->cart->contains($request->item_id)){ //laravel.com/docs/12.x/collections#method-contains
            $user->cart()->attach($request->item_id); //laravel.com/docs/12.x/eloquent-relationships#attaching-detaching
            return 1;
        }
        return 0;
    }

    public function delete_cart_item(Request $request){
        if(!session("id") || empty($request->item_id)){
            return -1;
        }
        $user = User::find(session("id"));
        if($user->cart->contains($request->item_id)){
            $user->cart()->detach($request->item_id);
            return 1;
        }
        return 0;
    }

    public function get_saved_items(){
        if(!session("id")){
            return [];
        }
        $user = User::find(session("id"));
        return $user->saved_items()->select("item.id", "item.item_id", "title", DB::raw("FORMAT(price,2) AS price"), DB::raw("FORMAT(shipping,2) AS shipping"), "src")->get();
    }

    public function add_saved_item(Request $request){
        if(!session("id") || empty($request->item_id)){
            return -1;
        }
        $user = User::find(session("id"));
        if(!$user->saved_items->contains($request->item_id)){
            $user->saved_items()->attach($request->item_id);
            return 1;
        }
        return 0;
    }

    public function delete_saved_item(Request $request){
        if(!session("id") || empty($request->item_id)){
            return -1;
        }
        $user = User::find(session("id"));
        if($user->saved_items->contains($request->item_id)){
            $user->saved_items()->detach($request->item_id);
            return 1;
        }
        return 0;
    }
}
