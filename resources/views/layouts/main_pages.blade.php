@extends('layouts.common')

@section('css')
    <link rel="stylesheet" href="{{ url('assets/css/navbar.css') }}">
    <link rel="stylesheet" href="{{ url('assets/css/footer.css') }}">
    <link rel="stylesheet" href="{{ url('assets/css/mobile_pages.css') }}">
@endsection

@section('js')
    <script src="{{url('assets/js/mobile.js')}}" defer></script>
@endsection

@section('layout')
    @section('navbar')
        <nav id="nav_1">
            <div id="nav_1_left">
                @yield('ebay-logo')
                @if (session("name"))
                    <span>Ciao {{ session("name") }}! (<a href="{{ url('/logout') }}" class="login">Esci</a>)</span>
                @else
                    <span>Ciao! (<a href="{{ url('/login') }}" class="login">Accedi</a> o <a href="{{ url(path: '/signup') }}" class="login">Registrati</a>)</span>
                @endif
                <a href="{{ url('/help') }}">
                    Aiuto e contatti
                </a>
            </div>
            <div id="nav_1_right">
                @yield('currency_exchange')
                @if (session("name"))
                    <a href="{{ url('/user/saved_items') }}" id="my-eBay"> Articoli salvati </a>
                @endif
                <a href="{{ url('/user/cart') }}"><img src="{{url('assets/images/shopping-cart-icon.png')}}" id="shopping-cart-icon"/></a>
            </div>
        </nav>
    @show
    @section('navbar_mobile')
        <nav id="nav_1_mobile">
            <img src="{{url('assets/images/eBay_logo.png')}}" class="ebay-logo"/>
            <div id="nav_1_mobile_right">
                <a href="{{ url('/user/cart') }}"><img src="{{url('assets/images/shopping-cart-icon.png')}}" /></a>
                <div id="mobile_menu" class="relative">
                    <img src="{{url('assets/images/hamburger-icon.png')}}" />
                    <div class="category-menu hidden">
                        @if (session("name"))
                            <span>Ciao {{ session("name") }}! (<a href="{{ url('/logout') }}" class="login">Esci</a>)</span>
                        @else
                            <span><a href="{{ url('/login') }}">Accedi</a></span>
                            <span><a href="{{ url(path: '/signup') }}">Registrati</a></span>
                        @endif
                        <span><a href="assets/php/help.php">Aiuto e contatti</a></span>
                    </div>
                </div>
            </div>
        </nav>
    @show
    <div class="gray-line"></div>
    @yield('additional_contents')
    @section('main')
        <article id="main">
            @yield('contents')
        </article>
    @show
    @section('footer')
        <footer id="footer">
            <div id="footer-container">
                <div class="block-container">
                    <span>Compra</span><br>
                    Come fare acquisti<br>
                    Acquisti per categoria<br>
                    eBay Imperdibili<br>
                    App eBay<br>
                    I brand in vendita su eBay<br>
                    Marche auto<br>
                    Aste di beneficenza<br>
                    Negozi Hub<br>
                    eBay Extra<br>
                </div>
                <div class="block-container">
                    <span>Vendi su eBay</span><br>
                    Spazio venditori<br>
                    Tariffe venditori<br>
                    Negozi<br>
                    Centro spedizioni<br>
                    Protezione venditori<br>
                    Vendite internazionali<br>
                    Novità per i venditori professionali<br>
                    Strumenti di vendita<br>
                </div>
                <div class="block-container">
                    <span>A proposito di eBay</span><br>
                    Informazioni Note legali<br>
                    Mediazione<br>
                    Ufficio stampa<br>
                    Pubblicità su eBay<br>
                    Affiliazione<br>
                    Lavora in eBay<br>
                    VeRO: Proprietà Intellettuale<br>
                </div>
                <div class="block-container">
                    <p>
                        <span>Aiuto e contatti</span><br>
                        Spazio sicurezza<br>
                        Garanzia cliente eBay<br>
                    </p>
                    <p>
                        <span>Community</span><br>
                        Facebook<br>
                        YouTube<br>
                        Instagram<br>
                        Domande e risposte tra utenti<br>
                        Forum<br>
                        Gruppi<br>
                        Bacheca Annunci<br>
                    </p>
                </div>
            </div>
            <div id="footer-mobile">
                <a href="">Aziende del gruppo eBay</a>
                <a href="">Bacheca Annunci</a>
                <a href="">Community</a>
                <a href="">Spazio Sicurezza</a>
                <a href="">Come vendere</a>
                <a href="">Spazio venditori</a>
                <a href="">Regole eBay</a>
                <a href="">Affiliazione</a>
                <a href="assets/php/help.php">Aiuto e contatti</a>
                <a href="">Mappa del sito</a>
            </div>
            <div id="copyright">
                Copyright 2025 Matteo Piras. Tutti i diritti riservati.
            </div>
        </footer>
    @show
@endsection