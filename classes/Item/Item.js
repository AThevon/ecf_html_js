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
}

export default Item;
