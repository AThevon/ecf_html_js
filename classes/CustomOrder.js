class CustomOrder {
   constructor(formId) {
      this.form = document.getElementById(formId);
      this.initEventListener();
   }

   initEventListener() {
      this.form.addEventListener("submit", this.handleSubmit.bind(this));
   }

   handleSubmit(e) {
      e.preventDefault();
      const formData = new FormData(this.form);
      const fileInput = this.form.querySelector(
         'input[type="file"][name="files"]'
      );
      const files = fileInput.files;
      for (let i = 0; i < files.length; i++) {
         formData.append("files", files[i]);
         console.log(files[i]);
      }
   }
}

export default CustomOrder;
