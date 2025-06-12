<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class APIController extends Controller
{
    public function get_storepage_items_by_category($category){
        $items = Item::where("category","=",$category)->select(DB::raw("item.id, item.item_id, title, FORMAT(price,2) AS price, FORMAT(shipping,2) AS shipping, src"))->get();
        return $items;
    }

    public function get_storepage_items_by_title($title){
        $items = Item::where("title","LIKE","%".$title."%")->select(DB::raw("item.id, item.item_id, title, FORMAT(price,2) AS price, FORMAT(shipping,2) AS shipping, src"))->get();
        return $items;
    }

    public function get_item_by_id($id){
        $item = Item::where("id","=",$id)->select(DB::raw("item.id, item.item_id, title, FORMAT(price,2) AS price, FORMAT(shipping,2) AS shipping, src"))->first();
        return $item;
    }

    public function check_signup_email($email){
        $user = User::where("email","=",$email)->first();
        return $user ? 1 : 0;
    }

    public function get_currency_exchange($old_currency){
        //Ricerca cambio valuta
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL,"https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/". urlencode($old_currency) .".json");
        curl_setopt($curl, CURLOPT_RETURNTRANSFER,1);
        $result = curl_exec($curl) or die("Error: ".curl_error($curl));
        curl_close($curl);
        return $result;
    }

    public function search_items($query){
        //Ricerca tramite eBay
        $client_id = env("EBAY_CLIENT");
        $client_secret = env("EBAY_SECRET");
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL,"https://api.sandbox.ebay.com/identity/v1/oauth2/token");
        curl_setopt($curl, CURLOPT_RETURNTRANSFER,1);
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, "grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope");
        $headers = array("Authorization: Basic ". base64_encode($client_id.":".$client_secret),
                        "Content-Type: application/x-www-form-urlencoded");
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        $token = curl_exec($curl) or die("Error: ".curl_error($curl));

        $token = json_decode($token);
        $token = $token->access_token;
        $search_value = urlencode($query);
        $data = http_build_query(array(
            "q" => $search_value,
            "limit" => 15
        ));

        curl_setopt($curl, CURLOPT_URL,"https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?".$data);
        $headers = array("Authorization: Bearer ".$token,
                        "Content-Type: application/json",
                        "X-EBAY-C-MARKETPLACE-ID: EBAY_US");
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($curl, CURLOPT_POST, 0);
        $result = curl_exec($curl) or die("Error: ".curl_error($curl));
        
        curl_close($curl);
        return $result;
    }

    public function add_item_in_db(Request $request){
        if(!isset($request->item_id) || !isset($request->title) || !isset($request->price) || !isset($request->shipping)){
            return $request->item_id . $request->title . $request->price . $request->shipping . $request->src;
        }
        $check_item = Item::where("item_id",$request->item_id)->first();
        if($check_item == null){
            $item = new Item();
            $item->item_id = $request->item_id;
            $item->title = $request->title;
            $item->price = $request->price;
            $item->shipping = $request->shipping;
            $item->src = $request->src;
            $item->save();
            $check_item = Item::where("item_id",$request->item_id)->first();
        }
        
        return view("item")->with("item",$check_item);

    }
}
