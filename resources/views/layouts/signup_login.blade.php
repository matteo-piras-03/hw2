@extends('layouts.common')

@section('css')
    <link rel="stylesheet" href="{{ url('assets/css/signup.css') }}">
@endsection

@section('layout')
    <header id="header">
        <a href="{{ url('/home') }}"><img src="{{ url('assets/images/eBay_logo.png') }}" class="ebay-logo"></a>
        <span>
            @yield('user_message')
        </span>
    </header>
    <article id="main">
        <div id="signup-box">
            <h1>@yield('h1_message')</h1>
            <form name="signup" method="POST" id="form">
                @yield('user_form')
            </form>
        </div>
        <div id="copyright">
            Copyright 2025 Matteo Piras. Tutti i diritti riservati.
        </div>
        <div>
            @yield('errors')
        </div>
    </article>
@endsection
