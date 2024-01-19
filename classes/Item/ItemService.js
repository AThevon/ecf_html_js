import Item from "./Item.js";

class ItemService {
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

   goToItemPage(id) {
      window.location.href = `/pages/item?id=${id}`;
   }
}

export default new ItemService();
