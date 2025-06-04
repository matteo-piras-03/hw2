@extends('layouts.main_pages')

@section('title', $item->title )

@section('css')
    @parent
    <link rel="stylesheet" href="{{ url('assets/css/item_page.css') }}">
@endsection

@section('js')
    @parent
    <script>
        const item_id = {{ $item->id }};
        const base_url = "{{ url('/') }}";
        const get_item_by_id_url = base_url + "/get_item/";
        const add_cart_item_url = base_url + "/user/add_cart_item";
        const add_saved_item_url = base_url + "/user/add_saved_item";
        const active_session = "{{ session("id") }}";
        const token = "{{ csrf_token() }}";
    </script>
    <script src="{{ url('assets/js/item_page.js') }}" defer></script>
@endsection

@section('ebay-logo')
    <a href="{{ url('/home') }}"><img src="{{url('assets/images/eBay_logo.png')}}" class="ebay-logo"></a>
@endsection