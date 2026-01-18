
import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // Entrées
  {
    id: 'e1',
    name: 'Carpaccio de Saint-Jacques',
    description: 'Fines tranches de Saint-Jacques, zestes de citron vert, huile de truffe blanche et baies roses.',
    price: 12000,
    category: 'Entrées',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
    isPopular: true
  },
  {
    id: 'e2',
    name: 'Foie Gras Maison',
    description: 'Mi-cuit au torchon, chutney de figues fraîches et pain brioché toasté.',
    price: 15000,
    category: 'Entrées',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'e3',
    name: 'Burrata Crémeuse',
    description: 'Tomates anciennes, pesto de basilic frais et pignons de pin torréfiés.',
    price: 9500,
    category: 'Entrées',
    image: 'https://images.unsplash.com/photo-1600803907087-f56d462fd26b?q=80&w=800&auto=format&fit=crop',
    isVegetarian: true
  },

  // Plats
  {
    id: 'p1',
    name: 'Filet de Bœuf Rossini',
    description: 'Cœur de filet, escalope de foie gras poêlée, sauce Madère et écrasé de pommes de terre à la truffe.',
    price: 25000,
    category: 'Plats',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
    isPopular: true
  },
  {
    id: 'p2',
    name: 'Risotto aux Gambas Royale',
    description: 'Risotto crémeux au safran, gambas grillées à la plancha et petits pois croquants.',
    price: 18500,
    category: 'Plats',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=800&auto=format&fit=crop',
    isGlutenFree: true
  },
  {
    id: 'p3',
    name: 'Pavé de Saumon Unilatéral',
    description: 'Légumes de saison rôtis, sauce vierge aux herbes et quinoa croquant.',
    price: 16000,
    category: 'Plats',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=800&auto=format&fit=crop'
  },

  // Desserts
  {
    id: 'd1',
    name: 'Dôme Chocolat Noir',
    description: 'Cœur coulant au caramel beurre salé et éclats de noisettes du Piémont.',
    price: 7500,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1578985543813-bc8b0ad09295?q=80&w=800&auto=format&fit=crop',
    isPopular: true
  },
  {
    id: 'd2',
    name: 'Mille-Feuille Vanille',
    description: 'Pâte feuilletée croustillante, crème légère à la vanille Bourbon de Madagascar.',
    price: 6500,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800&auto=format&fit=crop'
  },

  // Boissons
  {
    id: 'b1',
    name: 'Cocktail Signature L\'Éclat',
    description: 'Gin premium, fleur de sureau, concombre frais et tonic artisanal.',
    price: 9000,
    category: 'Boissons',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'b2',
    name: 'Limonade Maison',
    description: 'Citron jaune pressé, menthe fraîche et sirop d\'agave.',
    price: 4500,
    category: 'Boissons',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop',
    isVegetarian: true
  }
];

export const CATEGORIES: { name: string; id: any }[] = [
  { name: 'Entrées', id: 'Entrées' },
  { name: 'Plats', id: 'Plats' },
  { name: 'Desserts', id: 'Desserts' },
  { name: 'Boissons', id: 'Boissons' }
];
