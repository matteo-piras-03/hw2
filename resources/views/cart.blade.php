@extends('layouts.main_pages')
@extends('buttons.currency_exchange')

@section('title', 'Carrello')

@section('css')
    @parent
    <link rel="stylesheet" href="{{ url('assets/css/cart.css') }}">
@endsection

@section('js')
    @parent
    <script>
        const base_url = "{{ url('/') }}";
        const get_cart_url = base_url + "/user/get_cart";
        const delete_cart_item_url = base_url + "/user/delete_cart_item"
        const token = "{{ csrf_token() }}";
    </script>
    <script src="{{ url('assets/js/cart.js') }}" defer></script>
@endsection

@section('ebay-logo')
    <a href="{{ url('/home') }}"><img src="{{url('assets/images/eBay_logo.png')}}" class="ebay-logo"></a>
@endsection

@section('additional_contents')
    <h1 class="h1-title">Carrello</h1>
@endsection

@section('contents')
    <section id="item-list">
    </section>
    <section id="buy-box">
        <div><h3>Totale: </h3> <span id="total"></span></br></div>
        <button>Procedi al pagamento</button>
    </section>
@endsection