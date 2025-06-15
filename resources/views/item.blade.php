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
        const active_session = "{{ session("id") }}";
    </script>
    <script src="{{ url('assets/js/item_page.js') }}" defer></script>
@endsection

@section('ebay-logo')
    <a href="{{ url('/home') }}"><img src="{{url('assets/images/eBay_logo.png')}}" class="ebay-logo"></a>
@endsection