class CartUI {
   constructor(cart) {
      this.cart = cart;
      this.titleContainer = document.getElementById("title-container");
      this.cartItemsContainer = document.getElementById("cart-items");
      this.cartTotalContainer = document.getElementById("cart-total-container");
      document.addEventListener('cartChange', () => this.displayCartItems());
      this.displayCartItems();
   }

   displayCartItems() {
      if (
         !this.cartItemsContainer ||
         !this.titleContainer ||
         !this.cartTotalContainer
      )
         return;

      const cartItems = this.cart.items;
      const totalPrice = this.cart.getTotalPrice();
      const totalItems = this.cart.getTotalItems();

      const titleSpan = this.titleContainer.querySelector("span");
      if (totalItems !== 0) {
         titleSpan.textContent = `Tu as ${totalItems} ${
            totalItems > 1 ? "articles" : "article"
         } dans ton panier !`;
      } else {
         titleSpan.textContent = ``;
      }

      if (totalItems === 0) {
         this.createEmptyPage();
      } else {
         this.cartItemsContainer.innerHTML = "";
         cartItems.forEach((item) => {
            const itemElement = this.createCartItem(item);
            this.cartItemsContainer.appendChild(itemElement);
         });
      }

      if (cartItems.length === 0) {
         this.cartTotalContainer.remove();
      } else {
         this.createTotalContainer(totalPrice);
      }
   }

   createCartItem(item) {
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

      this.cartItemsContainer.appendChild(itemElement);

      document
         .getElementById(`increment-${item.id}`)
         .addEventListener("click", () => {
            this.cart.incrementItem(item);
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
                  this.cart.removeItemFromCart(item);
               }
            } else {
               this.cart.decrementItem(item);
            }
         });
      document
         .getElementById(`remove-from-cart-${item.id}`)
         .addEventListener("click", () => {
            if (
               confirm(
                  `Es-tu sûr(e) de vouloir supprimer ${item.name} de ton panier ?`
               )
            ) {
               this.cart.removeItemFromCart(item);
            }
         });

      return itemElement;
   }

   createTotalContainer(totalPrice) {
      this.cartTotalContainer.innerHTML = "";
      const totalPriceElement = document.createElement("p");
      totalPriceElement.classList.add("total-price");
      totalPriceElement.textContent = `Prix total:`;
      const totalPriceSpan = document.createElement("span");
      totalPriceSpan.textContent = `${totalPrice} €`;
      totalPriceElement.appendChild(totalPriceSpan);
      this.cartTotalContainer.appendChild(totalPriceElement);

      const buttonTotalWrapper = document.createElement("div");

      // create a button to clear the cart
      const clearCartButton = document.createElement("button");
      clearCartButton.id = "cart-clear";
      buttonTotalWrapper.appendChild(clearCartButton);
      clearCartButton.addEventListener("click", () => {
         if (confirm("Es-tu sûr(e) de vouloir vider ton panier ?")) {
            this.cart.clearAllCart();
         }
      });

      // create a button to checkout
      const checkoutButton = document.createElement("button");
      checkoutButton.id = "cart-checkout";
      checkoutButton.textContent = "Valider la commande";
      buttonTotalWrapper.appendChild(checkoutButton);
      checkoutButton.addEventListener("click", () => {
         this.cart.clearAllCart();
         alert("Merci pour votre achat !");
      });

      this.cartTotalContainer.appendChild(buttonTotalWrapper);
   }

   createEmptyPage() {
      this.cartItemsContainer.innerHTML = "";
      this.cartItemsContainer.classList.add("empty-cart");
      const emptyImage = document.createElement("img");
      emptyImage.classList.add("empty-cart-image");
      emptyImage.src = "/assets/images/empty_cart.png";
      const emptyCartMessage = document.createElement("p");
      emptyCartMessage.classList.add("empty-cart-message");
      emptyCartMessage.textContent = "Votre panier est vide !";
      emptyImage.alt = "empty-cart";
      this.cartItemsContainer.appendChild(emptyImage);
      this.cartItemsContainer.appendChild(emptyCartMessage);
   }
}

export default CartUI;
