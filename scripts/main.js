import Cart from "../classes/Cart/Cart.js";
import CartUI from "../classes/Cart/CartUI.js";
import Header from "../classes/Header.js";
import ItemUI from "../classes/Item/ItemUI.js";
import ItemService from "../classes/Item/ItemService.js";
import CustomOrder from "../classes/CustomOrder.js";

document.addEventListener("DOMContentLoaded", () => {
   const cart = new Cart();
   new Header(cart);
   new CartUI(cart);
   const itemUI = new ItemUI(cart);

   if (document.getElementById("items-list")) {
      if (window.location.pathname === "/pages/") {
         ItemService.getLatestItems()
            .then((items) => {
               itemUI.displayItems(items);
            })
            .catch((error) => console.error("Error loading items:", error));
      } else {
         ItemService.getAll()
            .then((items) => {
               itemUI.displayItems(items);
            })
            .catch((error) => console.error("Error loading items:", error));
      }
   }

   if (window.location.pathname === "/pages/item/") {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("id");
      ItemService.getById(id)
         .then((item) => {
            itemUI.displaySingleItem(item);
         })
         .catch((error) => console.error("Error loading item:", error));
   }

   if (window.location.pathname === "/pages/custom/") {
      new CustomOrder("custom-order-form", "file-preview");
   }
});
