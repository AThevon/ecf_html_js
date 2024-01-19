import ItemService from "./ItemService.js";

class ItemUI {
   constructor(cart) {
      this.cart = cart;
      this.setPage();
   }

   setPage() {
      if (window.location.pathname === "/pages/item/") {
         this.itemsList = document.getElementById("item-content");
      } else {
         this.itemsList = document.getElementById("items-list");
      }
   }

   createItem(item) {
      const itemCard = document.createElement("li");
      const itemImage = document.createElement("img");
      const itemInfoContainer = document.createElement("div");
      const itemName = document.createElement("h3");
      const itemPrice = document.createElement("p");
      const priceLogo = document.createElement("span");
      const addToCartButton = document.createElement("button");

      itemImage.src = item.image;
      itemImage.alt = item.name;

      itemInfoContainer.classList.add("item-info-container");

      itemName.textContent = item.name;
      itemName.classList.add("item-name");

      itemPrice.textContent = item.price;
      itemPrice.classList.add("item-price");

      priceLogo.textContent = "€";
      itemPrice.appendChild(priceLogo);

      itemInfoContainer.appendChild(itemName);
      itemInfoContainer.appendChild(itemPrice);

      addToCartButton.textContent = "Ajouter au panier";
      addToCartButton.id = `add-to-cart-${item.id}`;

      itemCard.appendChild(itemImage);
      itemCard.appendChild(itemInfoContainer);
      itemCard.appendChild(addToCartButton);

      itemCard.setAttribute("tabindex", "0");
      itemCard.addEventListener("click", () => {
         console.log("Item card clicked, ID:", item.id); 
         ItemService.goToItemPage(item.id);
      });
      
      return itemCard;
   }

   clearItems() {
      this.itemsList.innerHTML = "";
   }

   displayItems(items) {
      this.clearItems();

      items.forEach((item) => {
         const itemElement = this.createItem(item);
         this.itemsList.appendChild(itemElement);
         document
            .getElementById(`add-to-cart-${item.id}`)
            .addEventListener("click", (e) => {
               e.stopPropagation();
               this.cart.addItemToCart(item);
            });

         // Handle keyboard events
         itemElement.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
               ItemService.goToItemPage(item.id);
            }
         });
      });
   }

   displaySingleItem(item) {
      const itemPage = document.getElementById("item-content");
      itemPage.innerHTML = "";

      const returnButton = document.createElement("button");
      returnButton.textContent = "Retour";
      returnButton.addEventListener("click", () => {
         window.history.back();
      });
      itemPage.appendChild(returnButton);

      const singleItemContainer = document.createElement("div");
      singleItemContainer.classList.add("item-container");

      const itemImage = document.createElement("img");
      itemImage.src = item.image;
      itemImage.alt = item.name;
      singleItemContainer.appendChild(itemImage);

      const infoContainer = document.createElement("div");
      infoContainer.classList.add("item-info");

      const itemName = document.createElement("h2");
      itemName.classList.add("item-name");
      itemName.textContent = item.name;
      infoContainer.appendChild(itemName);

      const itemPrice = document.createElement("p");
      itemPrice.textContent = `${item.price} €`;
      infoContainer.appendChild(itemPrice);

      const itemDescription = document.createElement("p");
      itemDescription.textContent = item.description;
      infoContainer.appendChild(itemDescription);

      const itemDimensions = document.createElement("p");
      itemDimensions.textContent = `Dimensions: ${item.length} x ${item.width} x ${item.height} cm`;
      infoContainer.appendChild(itemDimensions);

      const itemWeight = document.createElement("p");
      itemWeight.textContent = `Poids: ${item.weight} g`;
      infoContainer.appendChild(itemWeight);

      const addToCartButton = document.createElement("button");
      addToCartButton.textContent = "Ajouter au panier";
      addToCartButton.id = `add-to-cart-${item.id}`;
      infoContainer.appendChild(addToCartButton);

      singleItemContainer.appendChild(infoContainer);

      this.itemsList.appendChild(singleItemContainer);

      document
         .getElementById(`add-to-cart-${item.id}`)
         .addEventListener("click", () => {
            this.cart.addItemToCart(item);
         });
   }
}

export default ItemUI;
