@extends('layouts.main_pages')

@section('title', 'Oggetti salvati')

@section('css')
    @parent
    <link rel="stylesheet" href="{{ url('assets/css/storepage.css') }}">
@endsection

@section('js')
    @parent
    <script>
        const base_url = "{{ url('/') }}";
        const add_cart_item_url = base_url + "/user/add_cart_item";
        const get_saved_items_url = base_url + "/user/get_saved_items";
        const delete_saved_item_url = base_url + "/user/delete_saved_item";
        const token = "{{ csrf_token() }}";
    </script>
    <script src="{{ url('assets/js/saved_items.js') }}" defer></script>
@endsection

@section('ebay-logo')
    <a href="{{ url('/home') }}"><img src="{{url('assets/images/eBay_logo.png')}}" class="ebay-logo"></a>
@endsection

@section('contents')
    <section id="item-list"></section>
@endsection