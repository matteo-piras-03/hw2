@extends('layouts.signup_login')

@section('title','Registrati su eBay')

@section('js')
    <script>
        base_url = "{{ url('/') }}";
        check_signup_email_url = base_url + "/check_signup_email/";
    </script>
    <script src="{{ url('assets/js/signup.js') }}" defer></script>
@endsection

@section('user_message')
    Hai già un account? <a href="{{ url('login') }}">Accedi</a>
@endsection

@section('h1_message','Registrati su eBay')
    
@section('user_form')
    <div id="name">
        <input type="text" name="name" placeholder="Nome" value="{{ old("name") }}">
        <input type="text" name="surname" placeholder="Cognome" value="{{ old("surname") }}">
    </div>
    <div class="error hidden" id="error_name">Compilare questi campi.</div>
    <input type="text" name="email" placeholder="Email" value="{{ old("email") }}">
    <div class="error hidden" id="error_email">Indirizzo email non valido.</div>
    <div class="error hidden" id="error_email_used">Indirizzo email già usato.</div>
    <input type="password" name="password" placeholder="Password">
    <ul id="error_password" class="hidden">
        La password deve contenere:
        <li data-type="password_length" class="unmet">Almeno 10 caratteri.</li>
        <li data-type="password_number" class="unmet">Almeno un numero.</li>
        <li data-type="password_uppercase" class="unmet">Almeno una lettera maiuscola.</li>
        <li data-type="password_special" class="unmet">Almeno un carattere speciale.</li>
    </ul>
    <input type="password" name="confirm_password" placeholder="Conferma password">
    <input type='hidden' name='_token' value="{{ csrf_token() }}">
    <div class="error hidden" id="error_confirm_password">Le password non corrispondono.</div>
    <input type="submit" name="submit" value="Registrati">
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
