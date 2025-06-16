//laravel utilities
const token = document.querySelector("meta[name='csrf-token']").content;
const get_cart_url = base_url + "/user/get_cart";
const delete_cart_item_url = base_url + "/user/delete_cart_item";

const item_list = document.querySelector("#item-list");
getCart();
function getCart(){
    item_list.innerHTML = "";
    fetch(get_cart_url).then(onResponse).then(onJson);
}

function onResponse(response){
    return response.json();
}

let total = 0;

function onJson(json){
    console.log(json);
    total = 0;
    currency_selected = "eur";
    if(json.length === 0){
        const empty_cart = document.createElement("span");
        empty_cart.classList.add("empty-cart");
        empty_cart.textContent = "Il tuo carrello è vuoto.";
        item_list.appendChild(empty_cart);
    }
    for(const item of json){
        const item_id = item.id;
        const item_title = item.title;
        const item_price = item.price;
        const item_shipping = item.shipping;
        const item_img = item.src;

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
        price.textContent = item_price + " €";
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
        const gray_line = document.createElement("div");
        gray_line.classList.add("gray-line")
        const remove = document.createElement("a");
        remove.href = "";
        remove.textContent = "Rimuovi dal carrello";
        remove.addEventListener("click",onClickRemoveButton);
        const br = document.createElement("br");
        const br2 = document.createElement("br");
        
        img_container.appendChild(img);
        div.appendChild(img_container);
        desc.appendChild(title);
        desc.appendChild(br);
        desc.appendChild(price);
        desc.appendChild(br2);
        desc.appendChild(shipping);
        desc.appendChild(remove);
        div.dataset.id = item_id;
        div.appendChild(desc);
        item_list.appendChild(div);
        item_list.appendChild(gray_line);

        total += parseFloat(item_price);
        total += parseFloat(item_shipping);
    }
    updateTotal(total.toFixed(2));
}

function updateTotal(total){
    const total_element = document.getElementById("total");
    total_element.textContent = total + " " + currency_to_symbol(currency_selected);
}

function onClickRemoveButton(event){
    event.preventDefault();
    const id = event.currentTarget.parentNode.parentNode.dataset.id;
    const formdata = new FormData();
    formdata.append("item_id", id);
    formdata.append("_token", token);
    fetch(delete_cart_item_url, {method: "post", body: formdata}).then(OnCartResponse).then(onCartText);
}

function OnCartResponse(response){
    if(response.ok)
        return response.text();
}

function onCartText(text){
    if(text === "1"){
        getCart();
    }
}

//nav

async function currency_click(event){
    event.preventDefault();
    currency_selected = event.target.id;
    if(currencies.includes(currency_selected)){
        get_prices();
        const exchange_rate = await get_currency_exchange(previous_currency_selected);
        console.log(exchange_rate);
        convert_currency_homepage(exchange_rate);
    }
}

const nav1_currency_exchange = document.querySelector("#currency-exchange");
const nav1_currency_exchange_menu = document.querySelector("#currency-exchange .category-menu");

const currency_as = document.querySelectorAll("#currency-exchange .category-menu span a");
const currencies = [];
for (const currency of currency_as){
    currency.addEventListener("click", currency_click);
    currencies.push(currency.id);
}

nav1_currency_exchange.addEventListener("click", currency_exchange_click);
let currency_selected = "eur";
let previous_currency_selected = "eur";
async function currency_exchange_click(event){
    nav1_currency_exchange_menu.classList.toggle("hidden"); 
}

async function get_currency_exchange(old_currency){
    return fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/" + old_currency + ".json").then(onCurrencyResponse, onError).then(onCurrencyJsonParam(old_currency));
}

function onError(error) {
    console.log("Error: " + error);
}

function onCurrencyResponse(response) {
    return response.json();
}

function onCurrencyJsonParam(currency){
    return function(json){
        return onCurrencyJson(json, currency);
    }
}

function onCurrencyJson(json, old_currency) {
    console.log(json);
    const exchange_rate = json[old_currency][currency_selected];
    previous_currency_selected = currency_selected;
    return exchange_rate;
}

let prices;
let shippings;

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
    total = 0;
    let price_converted;
    let i = 0;
    for(const price of prices){
        price_converted = convert_currency_single(prices_array[i], exchange_rate)
        total += parseFloat(price_converted);
        price.textContent = price_converted;
        i++;
    }
    i = 0;
    for(const price of shippings){
        price_converted = convert_currency_single(shippings_array[i], exchange_rate);
        total += parseFloat(price_converted);
        price.textContent = price_converted + " di spedizione";
        i++;
    }
    updateTotal(total.toFixed(2));
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