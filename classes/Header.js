class Header {
   constructor(cart) {
      this.cart = cart;
      this.headerElement = document.querySelector("header");
      this.createHeader();
      document.addEventListener("cartChange", () => this.updateCartCount());
   }

   createHeader() {
      // Clear existing header content
      this.headerElement.innerHTML = "";

      // Create logo
      this.createLogo();

      // Create navigation links
      this.createNavLinks();

      // Create user and cart container
      this.createUserCartContainer();
   }

   createLogo() {
      const logoContainer = document.createElement("a");
      logoContainer.classList.add("logo-container");
      logoContainer.href = "/ecf_html_js/pages/home/";

      const logoElement = document.createElement("img");
      logoElement.src = "/ecf_html_js/assets/images/logo.png";
      logoElement.alt = "logo";
      logoContainer.appendChild(logoElement);

      this.headerElement.appendChild(logoContainer);
   }

   createNavLinks() {
      const links = [
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

      const navElement = document.createElement("nav");
      const ulElement = document.createElement("ul");
      navElement.classList.add("navbar");
      navElement.appendChild(ulElement);
      this.headerElement.appendChild(navElement);

      links.forEach((link) => {
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
   }

   createUserCartContainer() {
      const userContainer = document.createElement("div");
      userContainer.classList.add("user-container");

      // User link
      const userElement = this.createUserElement();
      userContainer.appendChild(userElement);

      // Cart link
      const cartElement = this.createCartElement();
      userContainer.appendChild(cartElement);

      this.headerElement.appendChild(userContainer);
   }

   createUserElement() {
      const userElement = document.createElement("a");
      userElement.id = "user-link";
      userElement.href = "/ecf_html_js/pages/user/";
      userElement.classList.add("user");
      if (window.location.href === userElement.href) {
         userElement.classList.add("is-active");
      }
      userElement.textContent = "Mon Compte";
      return userElement;
   }

   createCartElement() {
      const cartElement = document.createElement("a");
      cartElement.id = "cart-link";
      cartElement.href = "/ecf_html_js/pages/cart/";
      cartElement.classList.add("cart-link");
      if (window.location.href === cartElement.href) {
         cartElement.classList.add("is-active");
      }

      // Create cartQuantitySpan here
      this.cartQuantitySpan = document.createElement("span");
      this.updateCartCount();
      cartElement.appendChild(this.cartQuantitySpan);

      return cartElement;
   }

   updateCartCount() {
      const quantity = this.cart.getTotalItems();
      if (quantity > 0) {
         this.cartQuantitySpan.textContent = quantity;
         this.cartQuantitySpan.classList.add("has-items");
      } else {
         this.cartQuantitySpan.textContent = "";
         this.cartQuantitySpan.classList.remove("has-items");
      }
   }
}

export default Header;
