@extends('layouts.main_pages')

@section('title', 'Servizio clienti eBay' )

@section('css')
    @parent
    <link rel="stylesheet" href="{{ url('assets/css/help.css') }}">
@endsection

@section('js')
    @parent
@endsection

@section('additional_contents')
    <header id="header">
        <a href="{{url ('/home') }}"><img src="{{url('assets/images/eBay_logo.png')}}" class="ebay-logo"></a>
        <h1>Servizio clienti eBay</h1>
    </header>
    <div class="gray-line"></div>
@endsection

@section('contents')
    <div id="search_container">
        <h1>Di cosa hai bisogno?</h1>
        <form>
            <input type="text" name="query" placeholder="Cerca nell'Aiuto di eBay" id="search_box">
            <input type="submit" value="Cerca" id="search_button">
        </form>
    </div>
    <h1>Seleziona il tuo tipo di assistenza richiesta</h1>
    <section id="section-1">
        <a>
            <div class="circle">
                <img src="{{ url('assets/images/help-1.png') }}" />
            </div>
            <span>
                Tariffe e fatture
            </span>
        </a>
        <a>
            <div class="circle">
                <img src="{{ url('assets/images/help-2.png') }}" />
            </div>
            <span>
                Vendere
            </span>
        </a>
        <a>
            <div class="circle">
                <img src="{{ url('assets/images/help-3.png') }}" />
            </div>
            <span>
                Restituzioni e rimborsi
            </span>
        </a>
        <a>
            <div class="circle">
                <img src="{{ url('assets/images/help-4.png') }}" />
            </div>
            <span>
                Comprare
            </span>
        </a>
        <a>
            <div class="circle">
                <img src="{{ url('assets/images/help-5.png') }}" />
            </div>
            <span>
                Il mio account
            </span>
        </a>
        <a>
            <div class="circle">
                <img src="{{ url('assets/images/help-6.png') }}" />
            </div>
            <span>
                Spedizione e tracciamento
            </span>
        </a>
    </section>
@endsection