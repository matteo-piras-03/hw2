//category menu
function menu_a_click(event){
    event.stopPropagation();
}

const menu_as = document.querySelectorAll(".category-menu span a");
for(const a of menu_as){
    a.addEventListener("click", menu_a_click);
}

//nav_mobile
const navmobile_menu_button = document.querySelector("#nav_1_mobile #mobile_menu");
const navmobile_menu = document.querySelector("#nav_1_mobile .category-menu");
navmobile_menu_button.addEventListener("click", menu_click);
function menu_click(event){
    event.stopPropagation();
    navmobile_menu.classList.toggle("hidden");
}