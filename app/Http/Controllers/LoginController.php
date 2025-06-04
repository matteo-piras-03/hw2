<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class LoginController extends Controller{
    public function get_signup(){
        if(session("email")){
            return redirect("/home");
        }
        return view("signup");
    }

    //funzione che registra un utente nel database, verificando che i dati sono corretti e che non sia già registrato
    public function post_signup(Request $request){
        if(session("email")){
            return redirect("/home");
        }
        //Validazione dati https://laravel.com/docs/11.x/validation
        $request->validate([
            "name" => ["required", "string"],
            "surname" => ["required", "string"],
            "email"=> ["required", "string", "email", "unique:App\Models\User,email"], //verifica che l'indirizzo email sia valido e non già presente nel db
            "password"=> ["required", "confirmed:confirm_password", //verifica i requisiti della password e anche che il campo confirm_password coincida con il campo password
            Password::min(10)->mixedCase()->letters()->numbers()->symbols()] //https://laravel.com/docs/11.x/validation#validating-passwords
        ]);
        //Se la validazione non va a buon fine, Laravel esegue un redirect sulla route precedente (register), dove viene riempita una lista con gli errori della validazione
        //Viene riempita automaticamente una variabile $error, con tutti gli errori riscontrati nella validazione

        //creazione utente e salvataggio
        $user = new User();
        $user->name = $request->name;
        $user->surname = $request->surname;
        $user->email = $request->email;
        $user->password = password_hash($request->password, PASSWORD_DEFAULT);
        $user->save();
        //Riempimento sessione
        session(["id" => $user->id, "email" => $user->email, "name" => $user->name]);
        return redirect("/home");
    }

    public function get_login(){
        if(session("email")){
            return redirect("/home");
        }
        return view("login");
    }
    public function post_login(Request $request){
        if(session("email")){
            return redirect("/home");
        }
        //Validazione dati
        $request->validate([
            "email" => ["required", "string", "email"],
            "password" => ["required"]
        ]);
        $user = User::where("email","=", $request->email)->first();
        if(!$user || !password_verify($request->password, $user->password)){
            return redirect("/login")->withErrors(["email" => "Email o password errati."])->withInput(); //https://laravel.com/docs/11.x/validation#manually-creating-validators
        }
        //Riempimento sessione
        session(["id" => $user->id, "email" => $user->email, "name" => $user->name]);
        return redirect("/home");
    }
    public function logout(){
        session()->flush();
        return redirect("/login");
    }
}
