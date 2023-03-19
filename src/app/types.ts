export interface Listing {
  id: string;
  name: string;
  description: string;
  price: number;
  user_id: string;
  views: number;
}

export type NewListing = Omit<Listing, 'id' | 'user_id' | 'views'>;