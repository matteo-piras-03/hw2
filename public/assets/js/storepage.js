//laravel utilities
const token = document.querySelector("meta[name='csrf-token']").content;
const get_cart_url = base_url + "/user/get_cart";
const add_cart_item_url = base_url + "/user/add_cart_item";
const delete_cart_item_url = base_url + "/user/delete_cart_item";
const get_saved_items_url = base_url + "/user/get_saved_items";
const add_saved_item_url = base_url + "/user/add_saved_item";
const delete_saved_item_url = base_url + "/user/delete_saved_item";

const item_list = document.querySelector("#item-list");
console.log(type);
if(type === "category")
    fetch(get_storepage_items_by_category_url + encodeURIComponent(value)).then(onResponse).then(onJson);
else if(type === "title"){
    fetch(get_storepage_items_by_title_url + encodeURIComponent(value)).then(onResponse).then(onJson);
}

function onResponse(response){
    return response.json();
}

function onImgMouseover(event){
    event.stopPropagation();
    const nodeList = event.currentTarget.childNodes;
    for(node of nodeList){
        if(node.tagName === "DIV"){
            node.classList.remove("hidden");
        }
    }
}

function onImgMouseout(event){
    event.stopPropagation();
    const nodeList = event.currentTarget.childNodes;
    for(const node of nodeList){
        if(node.tagName === "DIV"){
            node.classList.add("hidden");
        }
    }
}

function onSaveButtonClick(event){
    event.stopPropagation();
    const save_button = event.currentTarget;
    const id = save_button.parentNode.parentNode.dataset.id;
    const formdata = new FormData();
    formdata.append("item_id", id);
    formdata.append("_token", token);
    if(save_button.dataset.fullstate === "false"){
        //salvataggio dell'oggetto
        fetch(add_saved_item_url, {method: "post", body: formdata}).then(onFetchResponse).then(onSavedItemText(save_button));  
    }else{
        //cancellazzione dell'oggetto salvato
        fetch(delete_saved_item_url, {method: "post", body: formdata}).then(onFetchResponse).then(onDeleteSavedItemText(save_button));
    }
}

function onSavedItemText(save_button){
    return function(text){
        if(text >= 0)
            save_button.dataset.fullstate = "true"; 
    }
}

function onDeleteSavedItemText(save_button){
    return function(text){
        if(text === "1")
            save_button.dataset.fullstate = "false"; 
    }
}

function onBuyButtonClick(event){
    event.stopPropagation();
    if(active_session){
        const id = event.currentTarget.parentNode.parentNode.dataset.id;
        const cart_button = event.currentTarget;
        const desc = event.currentTarget.parentNode;
        const formdata = new FormData();
        formdata.append("item_id", id);
        formdata.append("_token", token);
        fetch(add_cart_item_url, {method: "post", body: formdata}).then(onFetchResponse).then(onCartText(desc, cart_button)); 
    }else{
        window.location.href = base_url + "/login";
    }
}

function onFetchResponse(response){
    if(response.ok)
        return response.text();
}

function onCartText(desc, cart_button){
    return function(text){
        const msg = document.createElement("span");
        switch(text){
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
}

let saved_items_list = [];

async function onJson(json){
    console.log(json);
    if(active_session) console.log("debug");
        await fetch(get_saved_items_url).then(onFetchSavedItemsReponse).then(onFetchSavedItemsJson); //controllo degli oggetti salvati per il tasto salva oggetti
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
        const br = document.createElement("br");
        
        img_container.appendChild(img);
        if(active_session){
            const save_button = document.createElement("div");
            save_button.classList.add("save-button");
            save_button.classList.add("hidden");
            if(saved_items_list.includes(item_id))
                save_button.dataset.fullstate = "true";
            else
                save_button.dataset.fullstate = "false";
            save_button.addEventListener("click", onSaveButtonClick);
            img_container.appendChild(save_button);
            img_container.addEventListener("mouseover", onImgMouseover, {capture: true});
            img_container.addEventListener("mouseout", onImgMouseout, {capture: true});
        }
        const buy_button = document.createElement("button");
        buy_button.classList.add("buy-button");
        buy_button.textContent = "Aggiungi al carrello";
        buy_button.addEventListener("click", onBuyButtonClick);
        div.appendChild(img_container);
        desc.appendChild(title);
        desc.appendChild(price);
        desc.appendChild(br);
        desc.appendChild(shipping);
        desc.appendChild(buy_button);
        div.dataset.id = item_id;
        div.appendChild(desc);
        div.addEventListener("click", onItemClick);
        item_list.appendChild(div);

    }
}

function onFetchSavedItemsReponse(response){
    if(response.ok)
        return response.json();
}

function onFetchSavedItemsJson(json){
    for(const item of json){
        saved_items_list.push(item.id);
    }
    console.log(saved_items_list);
}

function onItemClick(event){
    window.location.href = base_url + "/item/" + encodeURIComponent(event.currentTarget.dataset.id);
}