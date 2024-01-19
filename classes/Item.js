class Item {
   constructor(
      id,
      name,
      price,
      description,
      image,
      length,
      width,
      height,
      weight,
      created_at
   ) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.description = description;
      this.image = image;
      this.length = length;
      this.width = width;
      this.height = height;
      this.weight = weight;
      this.created_at = created_at;
   }

   // catch all items
   async getAll() {
      return fetch("../../data/items.json")
         .then((response) => response.json())
         .then((itemsData) => {
            if (itemsData) {
               return itemsData.map(
                  (item) =>
                     new Item(
                        item.id,
                        item.name,
                        item.price,
                        item.description,
                        item.image,
                        item.length,
                        item.width,
                        item.height,
                        item.weight,
                        item.created_at
                     )
               );
            } else {
               throw new Error("No items found");
            }
         });
   }

   // catch a single item
   async getById(id) {
      return fetch("../../data/items.json")
         .then((response) => response.json())
         .then((itemData) => {
            // Convert id to number if it's a string
            const numericId = Number(id);

            let item = itemData.find((i) => i.id === numericId);

            if (item) {
               return new Item(
                  item.id,
                  item.name,
                  item.price,
                  item.description,
                  item.image,
                  item.length,
                  item.width,
                  item.height,
                  item.weight,
                  item.created_at
               );
            } else {
               throw new Error("Item not found");
            }
         });
   }

   async getLatestItems() {
      return fetch("../../data/items.json")
         .then((response) => response.json())
         .then((itemsData) => {
            if (itemsData) {
               return itemsData
                  .sort((a, b) => b.created_at - a.created_at)
                  .slice(0, 3)
                  .map(
                     (item) =>
                        new Item(
                           item.id,
                           item.name,
                           item.price,
                           item.description,
                           item.image,
                           item.length,
                           item.width,
                           item.height,
                           item.weight,
                           item.created_at
                        )
                  );
            } else {
               throw new Error("No items found");
            }
         });
   }

   displayAllItems(items) {
      const itemsList = document.getElementById("items-list");
      // clear the items list
      itemsList.innerHTML = "";

      items.forEach((item) => {
         const itemCard = document.createElement("li");
         const itemImage = document.createElement("img");
         const itemInfoContainer = document.createElement("div");
         const itemName = document.createElement("h3");
         const itemPrice = document.createElement("p");
         const priceLogo = document.createElement("span");
         const addToCartButton = document.createElement("button");

         itemCard.addEventListener("click", () => this.goToItemPage(item.id));
         itemCard.setAttribute("tabindex", "0");

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
         itemsList.appendChild(itemCard);

         document
            .getElementById(`add-to-cart-${item.id}`)
            .addEventListener("click", (e) => {
               e.stopPropagation();
               cartInstance.addItemToCart(item);
            });

         // Handle keyboard events
         itemCard.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
               this.goToItemPage(item.id);
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

      itemPage.appendChild(singleItemContainer);

      document
         .getElementById(`add-to-cart-${item.id}`)
         .addEventListener("click", () => {
            cartInstance.addItemToCart(item);
         });
   }

   displayLatestItems(items) {
      const latestItems = document.getElementById("items-latest");
      latestItems.innerHTML = "";

      items.forEach((item) => {
         const itemCard = document.createElement("li");
         const itemImage = document.createElement("img");
         const itemInfoContainer = document.createElement("div");
         const itemName = document.createElement("h3");
         const itemPrice = document.createElement("p");
         const priceLogo = document.createElement("span");
         const addToCartButton = document.createElement("button");

         itemCard.addEventListener("click", () => this.goToItemPage(item.id));
         itemCard.setAttribute("tabindex", "0");

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
         latestItems.appendChild(itemCard);

         document
            .getElementById(`add-to-cart-${item.id}`)
            .addEventListener("click", (e) => {
               e.stopPropagation();
               cartInstance.addItemToCart(item);
            });

         // Handle keyboard events
         itemCard.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
               this.goToItemPage(item.id);
            }
         });
      });
   }

   goToItemPage(id) {
      window.location.href = `/ecf_html_js/pages/item?id=${id}`;
   }
}
