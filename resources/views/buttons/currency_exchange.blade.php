@section('currency_exchange')
    <button class="relative" id="currency-exchange">
        Tasso di cambio <img src="{{url('assets/images/chevron-down.png')}}" class="chevron-down"/>
        <div class="category-menu hidden">
            <span><a id="eur">EUR €</a></span>
            <span><a id="usd">USD $</a></span>
            <span><a id="gbp">GBP £</a></span>
            <span><a id="chf">CHF Fr.</a></span>
            <span><a id="try">TRY ₺</a></span>
            <span><a id="rub">RUB ₽</a></span>
        </div>
    </button>
@endsection