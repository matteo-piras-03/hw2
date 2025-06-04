@extends('layouts.main_pages')

@isset($category)
    @section('title', $category )
@endisset
@isset($title)
    @section('title', $title )
@endisset

@section('css')
    @parent
    <link rel="stylesheet" href="{{ url('assets/css/storepage.css') }}">
@endsection

@section('js')
    @parent
    <script>
        const base_url = "{{ url('/') }}";
        var type;
@isset($category)
        type = "category";
        const value = "{{ $category }}";
        const get_storepage_items_by_category_url = base_url + "/get_storepage_items_category/";
@endisset
@isset($title)
        type = "title";
        const value = "{{ $title }}";
        const get_storepage_items_by_title_url = base_url + "/get_storepage_items_title/";
@endisset
        const get_cart_url = base_url + "/user/get_cart";
        const add_cart_item_url = base_url + "/user/add_cart_item";
        const delete_cart_item_url = base_url + "/user/delete_cart_item";
        const get_saved_items_url = base_url + "/user/get_saved_items";
        const add_saved_item_url = base_url + "/user/add_saved_item";
        const delete_saved_item_url = base_url + "/user/delete_saved_item";
        const active_session = "{{ session("id") }}";
        const token = "{{ csrf_token() }}";
    </script>
    <script src="{{ url('assets/js/storepage.js') }}" defer></script>
@endsection

@section('ebay-logo')
    <a href="{{ url('/home') }}"><img src="{{url('assets/images/eBay_logo.png')}}" class="ebay-logo"></a>
@endsection

@section('contents')
    <section id="item-list"></section>
@endsection