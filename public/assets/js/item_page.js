fetch(get_item_by_id_url + encodeURIComponent(item_id)).then(onResponse).then(onJson);

function onResponse(response){
    return response.json();
}

async function onJson(json){
    const main = document.getElementById("main");
    const img_container = document.createElement("div");
    const img = document.createElement("img");
    const desc = document.createElement("div");
    const title = document.createElement("h3");
    const price = document.createElement("span");
    const shipping = document.createElement("span");
    const br = document.createElement("br");
    const br2 = document.createElement("br");
    img_container.classList.add("img-container");
    img.src = json.src;
    desc.classList.add("desc");
    title.textContent = json.title;
    price.classList.add("price");
    price.textContent = json.price + " €";
    shipping.classList.add("shipping");
    if(json.shipping === "0.00"){
        shipping.textContent = "Spedizione gratuita";
    }
    else{
        shipping.textContent = json.shipping + " €" + " di spedizione";
    }
    img_container.appendChild(img);
    main.appendChild(img_container);
    desc.appendChild(title);
    desc.appendChild(price);
    desc.appendChild(br);
    desc.appendChild(shipping);
    desc.appendChild(br2);
    if(active_session){
        const cart_button = document.createElement("button");
        cart_button.classList.add("buy-button");
        cart_button.textContent = "Aggiungi al carrello";
        const save_button = document.createElement("button");
        save_button.classList.add("save-button");
        save_button.textContent = "Salva oggetto";
        const br3 = document.createElement("br");
        cart_button.addEventListener("click",onCartButtonClick);
        save_button.addEventListener("click",onSaveButtonClick);
        desc.appendChild(cart_button);
        desc.appendChild(br3);
        desc.appendChild(save_button);
    }else{
        const a_login = document.createElement("a");
        a_login.textContent = "Accedi per poter inserire nel carrello."
        a_login.href = base_url + "/login";
        desc.appendChild(a_login);
    }
    main.appendChild(desc);

}

var add_item_cart_response;

async function onCartButtonClick(event){
    const cart_button = event.currentTarget;
    const desc = cart_button.parentNode;
    const formdata = new FormData();
    formdata.append("item_id", item_id);
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
    cart_button.removeEventListener("click",onCartButtonClick);
}

function onFetchResponse(response){
    if(response.ok)
        return response.text();
}

function onCartText(text){
    add_item_cart_response = text;
}
var save_item_response;

async function onSaveButtonClick(event){
    const save_button = event.currentTarget;
    const desc = save_button.parentNode;
    const formdata = new FormData();
    formdata.append("item_id", item_id);
    formdata.append("_token", token);
    await fetch(add_saved_item_url, {method: "post", body: formdata}).then(onFetchResponse).then(onSavedItemText);
    const msg = document.createElement("span");
    switch(save_item_response){
        case "-1":
            msg.classList.add("save-error");
            msg.textContent = "Errore.";
            desc.appendChild(msg);
            break;
        case "0":
            msg.classList.add("save-error");
            msg.textContent = "Oggetto già presente negli articoli salvati.";
            desc.appendChild(msg);
            break;
        case "1":
            msg.classList.add("save-added");
            msg.textContent = "Oggetto inserito negli articoli salvati.";
            desc.appendChild(msg);
            break;
    }
    save_button.classList.add("hidden");
    save_button.removeEventListener("click",onCartButtonClick);
}

function onSavedItemText(text){
    save_item_response = text;
}
