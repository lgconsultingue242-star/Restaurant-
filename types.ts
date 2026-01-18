
export type Category = 'Entrées' | 'Plats' | 'Desserts' | 'Boissons' | 'Vins';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  isPopular?: boolean;
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}
