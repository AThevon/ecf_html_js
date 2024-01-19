class Header {
   constructor(cart) {
      this.cart = cart;
      this.headerElement = document.querySelector("header");
      this.loadHeader();
   }

   loadHeader() {
      // Clear previous header content
      this.headerElement.innerHTML = "";

      // ... rest of loadHeader logic ...

      // Update the cart count initially
      this.updateCartCount();
   }

   updateCartCount() {
      // ... updateCartCount logic ...
      const quantity = this.cart.getTotalItems();
      // Find or create the cart quantity element and update it
      // ...
   }

   // Any other header related methods can go here
}

// Usage
document.addEventListener("DOMContentLoaded", () => {
   const cart = new Cart();
   new Header(cart);
});
