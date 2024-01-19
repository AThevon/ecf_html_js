let cartInstance = new Cart();
let itemInstance = new Item();


async function loadItemContent(id) {
   let item = await itemInstance.getById(id);
   itemInstance.displaySingleItem(item);
}

document.addEventListener("DOMContentLoaded", async () => {
   // catch the id from the query string
   const urlParams = new URLSearchParams(window.location.search);
   const id = urlParams.get("id");
   // load the item content
   loadItemContent(id);
});
