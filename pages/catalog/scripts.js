let cartInstance = new Cart();
let itemInstance = new Item();

async function loadCatalog() {
   const items = await itemInstance.getAll();
   itemInstance.displayAllItems(items);
}

document.addEventListener("DOMContentLoaded", loadCatalog);
