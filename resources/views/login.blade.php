@extends('layouts.signup_login')

@section('title','Accedi su eBay')

@section('js')
    <script src="{{ url('assets/js/login.js') }}" defer></script>
@endsection

@section('user_message')
    Prima volta su eBay? <a href="{{ url('/signup') }}">Registrati</a>
@endsection

@section('h1_message','Accedi al tuo account')
    
@section('user_form')
    <input type="text" name="email" placeholder="Email">
    <div class="error hidden" id="error_email">Indirizzo email non valido.</div>
    <input type="password" name="password" placeholder="Password">
    <input type='hidden' name='_token' value="{{ csrf_token() }}">
    <input type="submit" name="submit" value="Accedi">
@endsection

@section('errors')
    @if($errors->any())
    <div id="server_error">
        <ul>
            @foreach($errors->all() as $error)
                <li class="error">{{ $error }}</li>
            @endforeach
        </ul>
    </div>
    @endif
@endsection
