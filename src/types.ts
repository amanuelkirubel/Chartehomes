export type ListingType = 'sale' | 'rent';
export type ListingStatus = 'sold' | 'urgent' | null;

export interface Listing {
  id: string;
  title: string;
  type: ListingType;
  price: number;
  city: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  description: string;
  photos: string[];
  status?: ListingStatus;
  created_at: string;
  seller_username?: string;
  edit_token?: string;
  featured?: boolean;
}

export interface FilterState {
  city: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  searchQuery: string;
}

export type ViewMode = 'buy' | 'rent' | 'sell';
export type ActiveView = 'home' | 'detail' | 'sell' | 'edit' | 'admin';
export type Language = 'en' | 'am';
