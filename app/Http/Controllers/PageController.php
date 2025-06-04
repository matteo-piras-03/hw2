<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;

class PageController extends Controller
{
    public function home(){
        return view("homepage");
    }

    public function storepage_category($category){
        return view("storepage")->with("category",$category);
    }
    public function storepage_title($title){
        return view("storepage")->with("title",$title);
    }

    public function item($id){
        $item = Item::find($id);
        return view("item")->with("item",$item);
    }
    public function help(){
        return view("help");
    }

    public function cart(){
        if(session("id")){
            return view("cart");
        }
        return redirect("/login");
    }

    public function saved_items(){
        if(session("id")){
            return view("saved_items");
        }
        return redirect("/login");
    }

}
