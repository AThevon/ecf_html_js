class Cart {
   constructor() {
      this.loadCart();
      // create a custom event to be dispatched when the cart changes
      this.cartChangeEvent = new Event('cartChange');
   }

   loadCart() {
      return (this.items = JSON.parse(localStorage.getItem("cart")) || []);
   }

   saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.items));
      document.dispatchEvent(this.cartChangeEvent);
   }

   incrementItem(item) {
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

   setCartChangeCallback(callback) {
      this.onCartChange = callback;
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
}

export default Cart;
