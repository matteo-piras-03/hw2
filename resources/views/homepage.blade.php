@extends('layouts.main_pages')
@extends('buttons.currency_exchange')

@section('title', 'hw2')

@section('css')
    @parent
    <link rel="stylesheet" href="{{ url('assets/css/index.css') }}">
@endsection

@section('js')
    @parent
    <script>
        const base_url = "{{ url('/') }}";
        const get_storepage_items_by_category_url = base_url + "/get_storepage_items_category/";
        const get_storepage_items_by_title_url = base_url + "/get_storepage_items_title/";
        const currency_exchange_url = base_url + "/get_currency_exchange/";
        const search_items_url = base_url + "/search/";
        const add_item_in_db_url = base_url + "/add_item_in_db";
        const token = "{{ csrf_token() }}";
    </script>
    <script src="{{ url('assets/js/index.js') }}" defer></script>
@endsection

@section('additional_contents')
    <header id="header">
        <a href="{{url('/home')}}"><img src="{{url('assets/images/eBay_logo.png')}}" class="ebay-logo"></a>
        <form>
            <div id="search_bar">
                <input type="text" name="query" placeholder="Cerca su eBay" id="search_box" required>
                <input type="image" src="{{url('assets/images/search-icon.png')}}" id="search-img"/>
            </div>
            <input type="submit" value="Cerca" id="search_button">
        </form>
    </header>
    <div class="gray-line"></div>
    <nav id="nav_2">
        <a href="{{ url('/storepage_category/electronics') }}">
            Elettronica
        </a>
        <a href="{{ url('/storepage_category/household_appliances') }}">
            Elettrodomestici
        </a>
        <a href="{{ url('/storepage_category/home_garden') }}">
            Casa e Giardino
        </a>
        <a href="{{ url('/storepage_category/collectibles') }}">
            Collezionismo
        </a>
        <a href="{{ url('/storepage_category/fashion') }}">
            Moda
        </a>
        <a href="{{ url('/storepage_category/sport') }}">
            Sport
        </a>
        <a href="{{ url('/storepage_category/motors') }}">
            Motori
        </a>
        <a href="{{ url('/storepage_category/refurbished') }}">
            Ricondizionato
        </a>
    </nav>
@endsection

@section('contents')
    <section id="search_results" class="hidden">
        <h1>Risultati della ricerca</h1>
        <div id="search_results_container">
        </div>
    </section>
    <section id="section-1" class="content-1">
        <div id="overlay-1">
            <div class="upper">
                <div class="text">
                    <h1>Restituisci con facilità</h1>
                    <p>Se l'ordine non ti soddisfa, puoi restituirlo senza problemi.<br></p>
                    <button class="button-1 text-button">Scopri di più</button>
                </div>
                <img src="" class="hidden"/>
            </div>
            <div id="nav-small">
                <div class="spacer"></div>
                <div id="nav-small-left">
                    <div class="dot" data-index="0" data-active="1" data-content="1"></div>
                    <div class="dot" data-index="1" data-active="0" data-content="1"></div>
                    <div class="dot" data-index="2" data-active="0" data-content="1"></div>
                </div>
                <div id="nav-small-right">
                    <button data-position="left">
                        <img src="{{url('assets/images/chevron-left.png')}}" class="chevron-left"/>
                    </button>
                    <button data-position="right">
                        <img src="{{url('assets/images/chevron-right.png')}}" class="chevron-right"/>
                    </button>
                </div>
            </div>
        </div>
    </section>
    <h1>I brand più ricercati su eBay</h1>
    <section id="section-2">
        <a href="{{ url('/storepage_title/apple') }}">
            <div class="circle">
                <img src="{{url('assets/images/apple_logo.png')}}" />
            </div>
            <span>
                Apple
            </span>
        </a>
        <a href="{{ url('/storepage_title/dyson') }}">
            <div class="circle">
                <img src="{{url('assets/images/dyson_logo.png')}}" />
            </div>
            <span>
                Dyson
            </span>
        </a>
        <a href="{{ url('/storepage_title/samsung') }}">
            <div class="circle">
                <img src="{{url('assets/images/samsung_logo.png')}}" />
            </div>
            <span>
                Samsung
            </span>
        </a>
        <a href="{{ url('/storepage_title/nintendo') }}">
            <div class="circle">
                <img src="{{url('assets/images/nintendo_logo.png')}}" />
            </div>
            <span>
                Nintendo
            </span>
        </a>
        <a href="{{ url('/storepage_title/pokemon') }}">
            <div class="circle">
                <img src="{{url('assets/images/pokemon_logo.png')}}" />
            </div>
            <span>
                Pokémon
            </span>
        </a>
        <a href="{{ url('/storepage_title/playstation') }}">
            <div class="circle">
                <img src="{{url('assets/images/playstation_logo.png')}}" />
            </div>
            <span>
                PlayStation
            </span>
        </a>
        <a href="{{ url('/storepage_title/lego') }}">
            <div class="circle">
            <img src="{{url('assets/images/LEGO_logo.png')}}" />
            </div>
            <span>
                Lego
            </span>
        </a>
    </section>
    <section id="section-3">
        <div>
            <h1>Servizio clienti eBay</h1>
            <p>Dalla spedizione ai resi, se hai dubbi, siamo qui per aiutarti.</p>
        </div>
        <a href="{{ url('/help') }}"class="button">Scopri di più</a>
    </section>
    <section id="section-4">
        <div class="item-list">
            <div class="item first">
                <div class="text">
                    <h1>Fino al 25% di sconto su Zipper!</h1>
                    Una selezione per il giardino e il fai da te<br>
                    <a href="{{ url('/storepage_title/zipper') }}" class="button">Compra</a>
                </div>
            </div>
        </div>
    </section>
    <section id="section-5">
        <div class="item-list">
            <div class="item first">
                <div class="text">
                    <h1>Elettrodomestici ricondizionati</h1>
                    Approfitta del coupon 10%<br>
                    <a href="{{ url('/storepage_category/refurbished') }}" class="button">Compra</a>
                </div>
            </div>
        </div>
    </section>
    <h1>Il marketplace delle passioni</h1>
    <section id="section-6">
        <a href="{{ url('/storepage_category/electronics') }}">
            <img src="https://ir.ebaystatic.com/cr/v/c01/1_PopDest_Homepage_Refresh_Elettronica.jpg"/>
            <span>
                Elettronica
            </span>
        </a>
        <a href="{{ url('/storepage_category/household_appliances') }}">
            <img src="https://i.ebayimg.com/images/g/XVIAAOSwTo9j8zCN/s-l500.jpg"/>
            </div>
            <span>
                Elettrodomestici
            </span>
        </a>
        <a href="{{ url('/storepage_category/home_garden') }}">
            <img src="https://i.ebayimg.com/images/g/5f4AAOSwXrhj8zCO/s-l500.jpg"/>
            </div>
            <span>
                Casa e giardino
            </span>
        </a>
        <a href="{{ url('/storepage_category/motors') }}">
            <img src="https://i.ebayimg.com/images/g/86oAAOSwx-xj8zCO/s-l500.jpg"/>
            </div>
            <span>
                Motori
            </span>
        </a>
        <a href="{{ url('/storepage_category/collectibles') }}">
            <img src="https://i.ebayimg.com/images/g/6HwAAOSwsSxj8zCO/s-l500.jpg"/>
            </div>
            <span>
                Collezionismo e passioni
            </span>
        </a>
        <a href="{{ url('/storepage_category/fashion') }}">
            <img src="https://ir.ebaystatic.com/cr/v/c01/PopDest_Homepage_Refresh_ModaBellezza.jpg"/>
            </div>
            <span>
                Moda e bellezza
            </span>
        </a>
        <a href="{{ url('/storepage_category/refurbished') }}">
            <img src="https://i.ebayimg.com/images/g/H6QAAOSwnntj80O-/s-l500.jpg"/>
            </div>
            <span>
                Ricondizionato
            </span>
        </a>
    </section>
    <section id="section-7">
        <div class="text">
            <h1>Esplora gli aritcoli di moda</h1>
            Trova i prodotti in offerta e risparmia fino a 100€<br>
            <a href="{{ url('/storepage_category/fashion') }}" class="button">Inizia ora</a>
        </div>
        <img src="{{url('assets/images/clothing.jpg')}}" />
    </section>
@endsection