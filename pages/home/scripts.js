let cartInstance = new Cart();
let itemInstance = new Item();

async function loadLatestItems() {
   const items = await itemInstance.getLatestItems();
   itemInstance.displayLatestItems(items);
}

document.addEventListener("DOMContentLoaded", loadLatestItems);
