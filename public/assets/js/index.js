//laravel utilities
const token = document.querySelector("meta[name='csrf-token']").content;
const get_storepage_items_by_category_url = base_url + "/get_storepage_items_category/";
const get_storepage_items_by_title_url = base_url + "/get_storepage_items_title/";
const currency_exchange_url = base_url + "/get_currency_exchange/";
const search_items_url = base_url + "/search/";
const add_item_in_db_url = base_url + "/add_item_in_db";

//nav_1
const nav1_currency_exchange = document.querySelector("#currency-exchange");
const nav1_currency_exchange_menu = document.querySelector("#currency-exchange .category-menu");

const currency_as = document.querySelectorAll("#currency-exchange .category-menu span a");
const currencies = [];
for (const currency of currency_as) {
    currency.addEventListener("click",currency_exchange_click);
    currencies.push(currency.id);
}

nav1_currency_exchange.addEventListener("click", currency_exchange_click);
var currency_selected = "eur";
var previous_currency_selected = "eur";
async function currency_exchange_click(event){
    nav1_currency_exchange_menu.classList.toggle("hidden");
    currency_selected = event.target.id;
    if(currencies.includes(currency_selected)){
        get_prices();
        const exchange_rate = await get_currency_exchange(previous_currency_selected); //utilizzo await per la sincronizzazione
        console.log(exchange_rate);
        convert_currency_homepage(exchange_rate);
    }
}

//section 1
const s1_dots = document.querySelectorAll("#nav-small-left .dot");
const s1_buttons = document.querySelectorAll("#nav-small-right button");
const s1 = document.getElementById("section-1");
const s1_text = document.querySelector("#section-1 .text");
const s1_text_button_init = document.querySelector("#section-1 .text .text-button");
s1_text_button_init.addEventListener("click", s1_1_button_click);
var active_dot = 0;

for(const button of s1_buttons){
    button.addEventListener("click", button_click);
}

function button_click(event){
    s1_dots[active_dot].dataset.active = "0";
    if(event.currentTarget.dataset.position === "left"){
        
        if(active_dot > 0){
            active_dot--;
        }
        else{
            active_dot = s1_dots.length - 1;
        }
    }
    else{
        if(active_dot < s1_dots.length - 1){
            active_dot++;
        }
        else{
            active_dot = 0;
        }
    }
    s1_dots[active_dot].dataset.active = "1";
    change_content();
}

function change_content(){
    const s1_overlay = document.querySelector("#section-1 #overlay-1");
    const s1_text_h1 = document.createElement("h1");
    const s1_text_p = document.createElement("p");
    const s1_text_button = document.createElement("button");
    const s1_img = document.querySelector("#section-1 .upper img");
    switch(active_dot){
        case 0:
            for(const dot of s1_dots){
                dot.dataset.content = "1";
            }
            s1.className = "";
            s1_text.innerHTML = "";
            s1_overlay.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
            s1_text_h1.textContent = "Restituisci con facilità";
            s1_text_p.textContent = "Se l'ordine non ti soddisfa, puoi restituirlo senza problemi.";
            s1_text_button.textContent = "Scopri di più";
            s1_text_button.classList.add("text-button");
            s1_text_button.classList.add("button-1");
            s1_text_button.addEventListener("click",s1_1_button_click);
            s1_text.appendChild(s1_text_h1);
            s1_text.appendChild(s1_text_p);
            s1_text.appendChild(s1_text_button);
            s1.classList.add("content-1");
            s1_img.src = "";
            s1_img.classList.add("hidden");
            break;
        case 1:
            for(const dot of s1_dots){
                dot.dataset.content = "2";
            }
            s1.className = "";
            s1.classList.add("content-2");
            s1_text.innerHTML = "";
            s1_overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
            s1_text_h1.textContent = "Risparmia sul meglio del ricondizionato";
            s1_text_p.textContent = "Approfitta del coupon 10% con la Tech Week";
            s1_text_button.textContent = "Acquista ora";
            s1_text_button.classList.add("text-button");
            s1_text_button.classList.add("button-2");
            s1_text_button.addEventListener("click",s1_2_button_click);
            s1_text.appendChild(s1_text_h1);
            s1_text.appendChild(s1_text_p);
            s1_text.appendChild(s1_text_button);
            s1_img.src = "assets/images/coupon-10.png";
            s1_img.classList.remove("hidden");
            break;
        case 2:
            for(const dot of s1_dots){
                dot.dataset.content = "3";
            }
            s1.className = "";
            s1.classList.add("content-3");
            s1_text.innerHTML = "";
            s1_overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
            s1_text_h1.textContent = "Scopri tutti gli articoli di collezionismo";
            s1_text_p.textContent = "Aggiudicati tantissime carte rare da professionisti del settore";
            s1_text_button.textContent = "Vai alla pagina";
            s1_text_button.classList.add("text-button");
            s1_text_button.classList.add("button-3");
            s1_text_button.addEventListener("click",s1_3_button_click);
            s1_text.appendChild(s1_text_h1);
            s1_text.appendChild(s1_text_p);
            s1_text.appendChild(s1_text_button);
            s1_img.src = "assets/images/auction-items.png";
            s1_img.classList.remove("hidden");
            break;
    }
}

function s1_1_button_click(){
    window.location.href = base_url + "/help";
}

function s1_2_button_click(){
    window.location.href = base_url + "/storepage_category/refurbished";
}

function s1_3_button_click(){
    window.location.href = base_url + "/storepage_category/collectibles";
}

//section 4

const s4_item_list = document.querySelector("#section-4 .item-list");
fetch(get_storepage_items_by_title_url + "ZIPPER").then(onResponse, onError).then(onItemJsonParam(s4_item_list));

function onResponse(response){
    return response.json();
}

function onItemJsonParam(item_list){
    return function(json){
        onItemJson(json, item_list);
    }
}

async function onItemJson(json, item_list){
    console.log(json);
    for(const item of json){
        const item_id = item.id;
        const item_title = item.title;
        const item_price = item.price;
        const item_shipping = item.shipping;
        const item_img = item.src;

        const a = document.createElement("a");
        a.href = base_url + "/item/" + encodeURIComponent(item_id);
        const div = document.createElement("div");
        div.classList.add("item");
        const img_container = document.createElement("div");
        img_container.classList.add("img-container");

        const desc = document.createElement("div");
        desc.classList.add("desc");
        const img = document.createElement("img");
        img.src = item_img;
        const title = document.createElement("span");
        title.classList.add("title");
        title.textContent = item_title;
        const price = document.createElement("span");
        price.classList.add("price");
        price.textContent = item_price + " € ";
        const shipping = document.createElement("span");
        shipping.classList.add("shipping");
        if(item_shipping === "0.00"){
            shipping.textContent = "Spedizione gratuita";
            shipping.dataset.free = "true";
        }
        else{
            shipping.textContent = item_shipping + " €" + " di spedizione";
            shipping.dataset.free = "false";
        }
        const br = document.createElement("br");
        
        img_container.appendChild(img);
        div.appendChild(img_container);
        desc.appendChild(title);
        desc.appendChild(br);
        desc.appendChild(price);
        desc.appendChild(shipping);
        div.dataset.id = item_id;
        div.appendChild(desc);
        a.appendChild(div)
        item_list.appendChild(a);

    }
}

//section 5

const s5_item_list = document.querySelector("#section-5 .item-list");
fetch(get_storepage_items_by_category_url + "refurbished").then(onResponse, onError).then(onItemJsonParam(s5_item_list));

//REST_API
//exchange-api https://github.com/fawazahmed0/exchange-api
//Questa api restituisce il tasso di cambio tra diverse valute
async function get_currency_exchange(old_currency){
    return fetch(currency_exchange_url + encodeURIComponent(old_currency)).then(onResponse, onError).then(onJsonParam(old_currency));
}

function onError(error) {
    console.log("Error: " + error);
}

function onJsonParam(currency){
    return function(json){
        return onJson(json, currency)
    }
}

function onJson(json, old_currency) {
    //json[eur] è un oggetto ha come proprieta' le valute e i rispettivi tassi di cambio rispetto all'euro
    console.log(json);
    const exchange_rate = json[old_currency][currency_selected];
    previous_currency_selected = currency_selected;
    return exchange_rate;
}

var prices;
var shippings;

function get_prices(){
    prices = document.querySelectorAll(".price");
    shippings = document.querySelectorAll(".shipping[data-free=\"false\"]");
    map_prices();
}

const prices_array = [];
const shippings_array = [];

function map_prices(){
    let i = 0;
    for(const price of prices){
        prices_array[i] = parseFloat(price.textContent).toFixed(2);
        i++;
    }
    i = 0;
    for(const shipping of shippings){
        shippings_array[i] = parseFloat(shipping.textContent).toFixed(2);
        i++;
    }
}

function convert_currency_homepage(exchange_rate){
    let i = 0;
    for(const price of prices){
        price.textContent = convert_currency_single(prices_array[i], exchange_rate) + " ";
        i++;
    }
    i = 0;
    for(const shipping of shippings){
        shipping.textContent = convert_currency_single(shippings_array[i], exchange_rate) + " di spedizione";
        i++;
    }
}

function convert_currency_single(start_price, exchange_rate){
    const currency_symbol = currency_to_symbol(currency_selected);
    const price = (start_price * exchange_rate).toFixed(2) + " " + currency_symbol;
    return price;
}

function currency_to_symbol(currency){
    let currency_symbol = "";
    switch(currency){
        case "eur":
            currency_symbol = "€";
            break;
        case "usd":
            currency_symbol = "$";
            break;
        case "gbp":
            currency_symbol = "£";
            break;
        case "chf":
            currency_symbol = "Fr.";
            break;
        case "try":
            currency_symbol = "₺";
            break;
        case "rub":
            currency_symbol = "₽";
            break;
    }
    return currency_symbol;
}

//ebay-api https://developer.ebay.com/api-docs

//implemetazione della richiesta di ricerca di prodotti su eBay
const search_form = document.querySelector("#header form");
search_form.addEventListener("submit", search_form_submit);

//event listener per il click sul pulsante di ricerca
function search_form_submit(event){
    event.preventDefault();
    const search_input = document.querySelector("#search_box");
    const search_value = encodeURIComponent(search_input.value);
    if(search_value.length > 0){
        console.log("Searching for: " + search_value);
        fetch(search_items_url + search_value).then(onSearchResponse, onSearchError).then(onSearchJson);
    }
}

function onSearchResponse(response) {
    console.log(response);
    return response.json();
}

function onSearchError(error) {
    console.log("Error: " + error);
}

//l'oggetto json restituito dalla ricerca contiene un array di oggetti itemSummary
//ogni oggetto itemSummary contiene le informazioni sul prodotto, come il titolo, il prezzo, l'immagine, ecc.
async function onSearchJson(json) {
    console.log(json);
    const search_results = document.querySelector("#search_results");
    search_results.classList.remove("hidden");
    const search_results_container = document.querySelector("#search_results_container");
    search_results_container.innerHTML = ""; //svuota il contenitore dei risultati di ricerca (per evitare di aggiungere i nuovi risultati ai vecchi)
    const item_summaries = json.itemSummaries;
    for(const item_summary of item_summaries){
        const id = item_summary.itemId;
        const title = item_summary.title;
        const price = item_summary.price.value;
        const currency = item_summary.price.currency.toLowerCase();
        const exchange_rate = await get_currency_exchange(currency);
        const converted_price = convert_currency_single(price, exchange_rate);
        let shipping = 0.00;
        let converted_shipping = 0.00;
        if('shippingOptions' in item_summary){
            shipping = item_summary.shippingOptions[0].shippingCost.value;
            converted_shipping = convert_currency_single(shipping, exchange_rate);
        }
        
        const img = document.createElement("img");
        if('image.imageUrl' in item_summary){
            img.src = item_summary.image.imageUrl; //alcune immagini ebay non sono disponibili
        }
        const img_container = document.createElement("div");
        img_container.classList.add("img-container");
        img_container.appendChild(img);
        const item = document.createElement("form");
        item.classList.add("item");
        
        item.action = add_item_in_db_url;
        item.method = "POST";
        const form_submit = document.createElement("input");
        form_submit.type = "submit";
        form_submit.classList.add("submit-item");
        form_submit.value = "Apri pagina oggetto";
        const form_item_id = document.createElement("input");
        form_item_id.type = "hidden";
        form_item_id.name = "item_id";
        form_item_id.value = id;
        const form_title = document.createElement("input");
        form_title.type = "hidden";
        form_title.name = "title";
        form_title.value = title;
        const form_price = document.createElement("input");
        form_price.type = "hidden";
        form_price.name = "price";
        form_price.value = price;
        const form_shipping = document.createElement("input");
        form_shipping.type = "hidden";
        form_shipping.name = "shipping";
        form_shipping.value = shipping;
        const form_src = document.createElement("input");
        form_src.type = "hidden";
        form_src.name = "src";
        form_src.value = img.src;
        const form_token = document.createElement("input");
        form_token.type = "hidden";
        form_token.name = "_token";
        form_token.value = token;

        const desc = document.createElement("div");
        desc.classList.add("desc");
        const br = document.createElement("br");
        const span_title = document.createElement("span");
        span_title.classList.add("title");
        span_title.textContent = title;
        const span_price = document.createElement("span");
        span_price.classList.add("price");
        span_price.textContent = converted_price + " ";
        const span_shipping = document.createElement("span");
        span_shipping.classList.add("shipping");
        if(parseFloat(converted_shipping) === 0){
            span_shipping.textContent = "Spedizione gratuita";
        }
        else{
            span_shipping.textContent = converted_shipping + " di spedizione";
        }
        item.appendChild(img_container);
        desc.appendChild(span_title);
        desc.appendChild(br);
        desc.appendChild(span_price);
        desc.appendChild(span_shipping);
        item.appendChild(desc);
        item.appendChild(form_item_id);
        item.appendChild(form_title);
        item.appendChild(form_price);
        item.appendChild(form_shipping);
        item.appendChild(form_src);
        item.appendChild(form_token);
        item.appendChild(form_submit);
        search_results_container.appendChild(item);
    }
}

