const navbar = [
   {
      name: "Accueil",
      route: "/ecf_html_js/pages/home/",
      template: "home",
   },
   {
      name: "Catalogue",
      route: "/ecf_html_js/pages/catalog/",
      template: "catalog",
   },
   {
      name: "Sur-Mesure",
      route: "/ecf_html_js/pages/custom/",
      template: "custom",
   },
   {
      name: "À Propos",
      route: "/ecf_html_js/pages/about/",
      template: "about",
   },
   {
      name: "Contact",
      route: "/ecf_html_js/pages/contact/",
      template: "contact",
   },
];

let cart = new Cart();

function loadHeader() {
   // adding navbar to header
   const headerElement = document.querySelector("header");

   // LOGO
   const logoContainer = document.createElement("a");
   logoContainer.classList.add("logo-container");
   logoContainer.href = "/ecf_html_js/pages/home";

   const logoElement = document.createElement("img");
   logoElement.src = "/ecf_html_js/assets/images/logo.png";
   logoElement.alt = "logo";
   logoContainer.appendChild(logoElement);

   headerElement.appendChild(logoContainer);

   // NAVLINKS
   const navElement = document.createElement("nav");
   const ulElement = document.createElement("ul");
   navElement.classList.add("navbar");
   navElement.appendChild(ulElement);
   headerElement.appendChild(navElement);

   navbar.forEach((link) => {
      const liElement = document.createElement("li");
      liElement.classList.add("nav-item");

      const aElement = document.createElement("a");
      aElement.id = "nav-link";
      aElement.href = link.route;
      aElement.textContent = link.name;
      if (window.location.pathname === link.route) {
         aElement.classList.add("is-active");
      }
      liElement.appendChild(aElement);
      ulElement.appendChild(liElement);
   });

   // USER
   const userContainer = document.createElement("div");
   userContainer.classList.add("user-container");
   const userElement = document.createElement("a");
   userElement.id = "user-link";
   userElement.href = "/ecf_html_js/pages/user/";
   if (window.location.href === userElement.href) {
      userElement.classList.add("is-active");
   }
   userElement.classList.add("user");
   userElement.textContent = "Mon Compte";
   userContainer.appendChild(userElement);

   // CART
   const cartElement = document.createElement("a");
   cartElement.id = "cart-link";
   cartElement.href = "/ecf_html_js/pages/cart/";
   if (window.location.href === cartElement.href) {
      cartElement.classList.add("is-active");
   }

   const quantity = cart.getTotalItems();
   if (quantity > 0) {
      const cartQuantity = document.createElement("span");
      cartQuantity.textContent = quantity;
      cartElement.appendChild(cartQuantity);
   }
   userContainer.appendChild(cartElement);

   headerElement.appendChild(userContainer);
}

document.addEventListener("DOMContentLoaded", loadHeader);
