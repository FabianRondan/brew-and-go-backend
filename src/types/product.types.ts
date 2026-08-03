export interface CreateCategoryInput {
  name: string;
}

export interface CreateProductInput {
  name: string;
  description: string;
  imageUrl?: string;
  categoryId: string;
}

export interface UpdateProductInput {
  name?: string;
  description?: string;
  imageUrl?: string;
  active?: boolean;
  categoryId?: string;
}

export interface CreateVariantInput {
  name: string;
  price: number;
  stock: number;
  productId: string;
}