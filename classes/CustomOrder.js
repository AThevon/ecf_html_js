class CustomOrder {
   constructor(formId, previewContainerId) {
      this.form = document.getElementById(formId);
      this.previewContainer = document.getElementById(previewContainerId);
      this.initEventListener();
   }

   initEventListener() {
      this.form.addEventListener("submit", this.handleSubmit.bind(this));
      const fileInput = this.form.querySelector(
         'input[type="file"][name="files"]'
      );
      fileInput.addEventListener("change", this.handleFileSelect.bind(this));
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

   handleFileSelect(e) {
      const files = e.target.files;
      this.clearPreview();
      for (let i = 0; i < files.length; i++) {
         this.createPreview(files[i]);
      }
   }

   createPreview(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
         const img = document.createElement("img");
         img.src = reader.result;
         img.alt = file.name;
         this.previewContainer.appendChild(img);
      };
   }

   clearPreview() {
      this.previewContainer.innerHTML = "";
   }
}

export default CustomOrder;
