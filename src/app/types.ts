export interface Listing {
  id: string;
  name: string;
  description: string;
  price: number;
  user_id: string;
  views: number;
}

export type NewListing = Omit<Listing, 'id' | 'user_id' | 'views'>;

export interface ProfileInfo {
  email: string;
  firstName?: string;
  lastName?: string;
  photoUrl?: string;
}

export interface Profile extends ProfileInfo {
  id: string;
}
