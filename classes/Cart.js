class Cart {
   constructor() {
      this.#loadCart();
   }

   #loadCart() {
      return (this.items = JSON.parse(localStorage.getItem("cart")) || []);
   }

   saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.items));
   }

   IncrementItem(item) {
      let singleItem = this.items.find((i) => i.id === item.id);
      singleItem.quantity++;
      this.saveCart();
   }

   decrementItem(item) {
      let singleItem = this.items.find((i) => i.id === item.id);
      singleItem.quantity--;
      this.saveCart();
   }

   addItemToCart(item) {
      let singleItem = this.items.find((i) => item.id === i.id);

      if (singleItem) {
         singleItem.quantity++;
      } else {
         this.items.push({ ...item, quantity: 1 });
      }

      this.saveCart();
   }

   removeItemFromCart(item) {
      this.items = this.items.filter((i) => i.id !== item.id);
      this.saveCart();
   }

   clearAllCart() {
      this.items = [];
      this.saveCart();
   }

   getTotalItems() {
      const totalItems = this.items.reduce(
         (total, item) => total + item.quantity,
         0
      );
      return totalItems;
   }

   getTotalPrice() {
      const totalPrice = this.items.reduce(
         (total, item) => total + item.price * item.quantity,
         0
      );
      return totalPrice.toFixed(2);
   }

   displayCartItems() {
      const cartItems = this.#loadCart();
      const totalPrice = this.getTotalPrice();
      const totalItems = this.getTotalItems();

      const titleContainer = document.getElementById("title-container");
      const titleSpan = titleContainer.querySelector("span");
      if (totalItems !== 0) {
         titleSpan.textContent = `Tu as ${totalItems} ${
            totalItems > 1 ? "articles" : "article"
         } dans ton panier !`;
      } else {
         titleSpan.textContent = ``;
      }

      const cartItemsContainer = document.getElementById("cart-items");
      cartItemsContainer.innerHTML = "";

      if (totalItems === 0) {
         cartItemsContainer.innerHTML = "";
         cartItemsContainer.classList.add("empty-cart");
         const emptyImage = document.createElement("img");
         emptyImage.classList.add("empty-cart-image");
         emptyImage.src = "/ecf_html_js/assets/images/empty_cart.png";
         const emptyCartMessage = document.createElement("p");
         emptyCartMessage.classList.add("empty-cart-message");
         emptyCartMessage.textContent = "Votre panier est vide !";
         emptyImage.alt = "empty-cart";
         cartItemsContainer.appendChild(emptyImage);
         cartItemsContainer.appendChild(emptyCartMessage);
      } else {
         cartItems.forEach((item) => {
            const itemElement = document.createElement("li");

            const imgElement = document.createElement("img");
            imgElement.src = item.image;
            imgElement.alt = item.name;
            itemElement.appendChild(imgElement);

            const itemInfoContainer = document.createElement("div");
            itemInfoContainer.classList.add("item-info-container");

            const h3Element = document.createElement("h3");
            h3Element.textContent = item.name;
            itemInfoContainer.appendChild(h3Element);

            const dimensionElement = document.createElement("p");
            dimensionElement.classList.add("dimensions");
            dimensionElement.textContent = `Dimensions:`;
            const dimensionSpan = document.createElement("span");
            dimensionSpan.textContent = `${item.length} x ${item.width} x ${item.height} cm`;
            dimensionElement.appendChild(dimensionSpan);

            itemInfoContainer.appendChild(dimensionElement);

            const weightElement = document.createElement("p");
            weightElement.classList.add("weight");
            weightElement.textContent = `Poids:`;
            const weightSpan = document.createElement("span");
            weightSpan.textContent = `${item.weight} kg`;
            weightElement.appendChild(weightSpan);
            itemInfoContainer.appendChild(weightElement);

            itemElement.appendChild(itemInfoContainer);

            const priceDivElement = document.createElement("div");
            priceDivElement.classList.add("price-container");

            const pElement = document.createElement("p");
            pElement.classList.add("price");
            pElement.textContent = `${item.price} €`;
            priceDivElement.appendChild(pElement);

            const buttonWrapper = document.createElement("div");
            buttonWrapper.classList.add("button-wrapper");

            const decrementButton = document.createElement("button");
            decrementButton.id = `decrement-${item.id}`;

            buttonWrapper.appendChild(decrementButton);

            const quantityElement = document.createElement("p");
            quantityElement.textContent = item.quantity;

            buttonWrapper.appendChild(quantityElement);

            const addButton = document.createElement("button");
            addButton.id = `increment-${item.id}`;

            buttonWrapper.appendChild(addButton);

            priceDivElement.appendChild(buttonWrapper);

            const removeButton = document.createElement("button");
            removeButton.id = `remove-from-cart-${item.id}`;
            removeButton.textContent = "Supprimer";
            priceDivElement.appendChild(removeButton);

            itemElement.appendChild(priceDivElement);

            cartItemsContainer.appendChild(itemElement);

            document
               .getElementById(`increment-${item.id}`)
               .addEventListener("click", () => {
                  this.IncrementItem(item);
                  this.displayCartItems();
               });
            document
               .getElementById(`decrement-${item.id}`)
               .addEventListener("click", () => {
                  if (item.quantity === 1) {
                     if (
                        confirm(
                           `Es-tu sûr(e) de vouloir supprimer ${item.name} de ton panier ?`
                        )
                     ) {
                        this.removeItemFromCart(item);
                     }
                  } else {
                     this.decrementItem(item);
                  }

                  this.displayCartItems();
               });
            document
               .getElementById(`remove-from-cart-${item.id}`)
               .addEventListener("click", () => {
                  if (
                     confirm(
                        `Es-tu sûr(e) de vouloir supprimer ${item.name} de ton panier ?`
                     )
                  ) {
                     this.removeItemFromCart(item);
                     this.displayCartItems();
                  }
               });
         });
      }

      const cartTotalContainer = document.getElementById(
         "cart-total-container"
      );
      if (cartItems.length === 0) {
         cartTotalContainer.remove();
      } else {
         cartTotalContainer.innerHTML = "";
         // create a total price element
         const totalPriceElement = document.createElement("p");
         totalPriceElement.classList.add("total-price");
         totalPriceElement.textContent = `Prix total:`;
         const totalPriceSpan = document.createElement("span");
         totalPriceSpan.textContent = `${totalPrice} €`;
         totalPriceElement.appendChild(totalPriceSpan);
         cartTotalContainer.appendChild(totalPriceElement);

         const buttonTotalWrapper = document.createElement("div");

         // create a button to clear the cart
         const clearCartButton = document.createElement("button");
         clearCartButton.id = "cart-clear";
         buttonTotalWrapper.appendChild(clearCartButton);
         clearCartButton.addEventListener("click", () => {
            if (confirm("Es-tu sûr(e) de vouloir vider ton panier ?")) {
               this.clearAllCart();
               this.displayCartItems();
            }
         });

         // create a button to checkout
         const checkoutButton = document.createElement("button");
         checkoutButton.id = "cart-checkout";
         checkoutButton.textContent = "Valider la commande";
         buttonTotalWrapper.appendChild(checkoutButton);
         checkoutButton.addEventListener("click", () => {
            this.clearAllCart();
            this.displayCartItems();
            alert("Merci pour votre achat !");
         });

         cartTotalContainer.appendChild(buttonTotalWrapper);
      }
   }
}
