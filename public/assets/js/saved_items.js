const item_list = document.querySelector("#item-list");
getSavedItems();
function getSavedItems(){
    item_list.innerHTML = "";
    fetch(get_saved_items_url).then(onResponse).then(onJson);
}

function onResponse(response){
    return response.json();
}

function onJson(json){
    console.log(json);
    if(json.length === 0){
        const empty_saved_items = document.createElement("span");
        empty_saved_items.classList.add("empty-saved-items");
        empty_saved_items.textContent = "Non hai oggetti salvati";
        item_list.appendChild(empty_saved_items);
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
        }
        else{
            shipping.textContent = item_shipping + " €" + " di spedizione";
        }
        const remove = document.createElement("a");
        remove.href = "";
        remove.textContent = "Rimuovi";
        remove.addEventListener("click", onClickRemoveButton);
        const br = document.createElement("br");
        const br2 = document.createElement("br");

        const buy_button = document.createElement("button");
        buy_button.classList.add("buy-button");
        buy_button.textContent = "Aggiungi al carrello";
        buy_button.addEventListener("click", onBuyButtonClick);
        
        img_container.appendChild(img);
        div.appendChild(img_container);
        desc.appendChild(title);
        desc.appendChild(br);
        desc.appendChild(price);
        desc.appendChild(br2);
        desc.appendChild(shipping);
        desc.appendChild(buy_button);
        desc.appendChild(remove);
        div.dataset.id = item_id;
        div.appendChild(desc);
        div.addEventListener("click", onItemClick);
        item_list.appendChild(div);
    }
}

function onItemClick(event){
    window.location.href = base_url + "/item/" + encodeURIComponent(event.currentTarget.dataset.id);
}

var delete_saved_item_response;

async function onClickRemoveButton(event){
    event.stopPropagation();
    event.preventDefault();
    const id = event.currentTarget.parentNode.parentNode.dataset.id;
    const formdata = new FormData();
    formdata.append("item_id", id);
    formdata.append("_token", token);
    await fetch(delete_saved_item_url, {method: "post", body: formdata}).then(OnSavedItemResponse).then(onSavedItemText);
    if(delete_saved_item_response === "1"){
        getSavedItems();
    }
}

function OnSavedItemResponse(response){
    if(response.ok)
    return response.text();
}

function onSavedItemText(text){
    delete_saved_item_response = text;
}

var add_item_cart_response;

async function onBuyButtonClick(event){
    event.stopPropagation();
    const id = event.currentTarget.parentNode.parentNode.dataset.id;
    const cart_button = event.currentTarget;
    const desc = event.currentTarget.parentNode;
    const formdata = new FormData();
    formdata.append("item_id", id);
    formdata.append("_token", token);
    await fetch(add_cart_item_url, {method: "post", body: formdata}).then(onFetchResponse).then(onCartText);
    const msg = document.createElement("span");
    switch(add_item_cart_response){
        case "-1": //errore fatale
            msg.classList.add("cart-error");
            msg.textContent = "Errore.";
            desc.appendChild(msg);
            break;
        case "0": //oggetto già presente nel carrello
            msg.classList.add("cart-error");
            msg.textContent = "Oggetto già presente nel carrello.";
            desc.appendChild(msg);
            break;
        case "1": //oggetto inserito correttamente nel carrello
            msg.classList.add("cart-added");
            msg.textContent = "Oggetto inserito nel carrello.";
            desc.appendChild(msg);
            break;
    }
    cart_button.classList.add("hidden");
    cart_button.removeEventListener("click",onBuyButtonClick);
}

function onFetchResponse(response){
    if(response.ok)
        return response.text();
}

function onCartText(text){
    add_item_cart_response = text;
}