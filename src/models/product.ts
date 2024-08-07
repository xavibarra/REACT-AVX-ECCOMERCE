import { Category } from "./category";

export interface Product {
  id: number;
  categories: Category;
  name: string;
  price: number;
  categoryId: number;
  imageUrl: string;
  offer: boolean;
  discount: number;
  rating: number;
  barcelonaStock: boolean;
  madridStock: boolean;
  murciaStock: boolean;
  valenciaStock: boolean;
  sevillaStock: boolean;
  sanSebastianStock: boolean;
  bilbaoStock: boolean;
  cordobaStock: boolean;
  aCorunaStock: boolean;
  segoviaStock: boolean;
}
