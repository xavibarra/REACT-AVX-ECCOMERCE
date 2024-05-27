export interface Product {
  id: number;
  name: string;
  price: number;
  category_id: number;
  image_url: string;
  isOffer: boolean;
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
