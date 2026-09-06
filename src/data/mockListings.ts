import { Listing } from '../types';

export const INITIAL_LISTINGS: Listing[] = [
  {
    id: 'ch-101',
    title: 'Modern 4BR Luxury Villa with Landscaped Garden',
    type: 'sale',
    price: 48000000,
    city: 'Addis Ababa',
    bedrooms: 4,
    bathrooms: 4,
    area: 420,
    description: 'Bole Atlas prime residential enclave. Features an open-concept Italian fitted kitchen, master suite with walk-in closet and jetted jacuzzi, 2-car sheltered parking, maid quarters with private bath, high-capacity water reservoir, and 3-phase backup generator wiring.',
    photos: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'urgent',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 14).toISOString(),
    featured: true,
  },
  {
    id: 'ch-102',
    title: 'Lakeview 3BR Villa with Scenic Balcony',
    type: 'sale',
    price: 26500000,
    city: 'Hawassa',
    bedrooms: 3,
    bathrooms: 3,
    area: 310,
    description: 'Serene lakeside living in Hawassa near Haile Resort area. Panoramic balcony views, polished hardwood floors, fruit garden with avocado and mango trees, electric security fencing, and secure peaceful neighborhood.',
    photos: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'
    ],
    status: null,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    featured: true,
  },
  {
    id: 'ch-103',
    title: 'Executive 3BR Furnished Apartment in Bole',
    type: 'rent',
    price: 180000,
    city: 'Addis Ababa',
    bedrooms: 3,
    bathrooms: 2,
    area: 175,
    description: 'Fully furnished executive apartment close to international schools and embassies. 24/7 security with CCTV, reliable Otis elevator, uninterrupted borehole water system, dedicated basement parking, and soundproof double-glazed windows.',
    photos: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    status: null,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    featured: true,
  },
  {
    id: 'ch-104',
    title: 'Contemporary 5BR G+2 Villa in CMC',
    type: 'sale',
    price: 59000000,
    city: 'Addis Ababa',
    bedrooms: 5,
    bathrooms: 5,
    area: 500,
    description: 'High-end contemporary multi-level home in CMC gated community. Rooftop terrace with 360 Addis mountain vistas, staff quarters, multiple reception lounges, solar water heating, and parking for 4 vehicles.',
    photos: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'
    ],
    status: null,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    featured: false,
  },
  {
    id: 'ch-105',
    title: 'Peaceful 3BR Bungalow by Lake Tana Shore',
    type: 'rent',
    price: 65000,
    city: 'Bahir Dar',
    bedrooms: 3,
    bathrooms: 2,
    area: 230,
    description: 'Charming single-story villa with lush tropical green garden, large verandas, modern tiled bathrooms, and gentle breezes from Lake Tana. Ideal for families, NGOs, or visiting professionals.',
    photos: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    status: null,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    featured: false,
  },
  {
    id: 'ch-106',
    title: '4BR Standalone Residence with Large Compound',
    type: 'sale',
    price: 34000000,
    city: 'Adama',
    bedrooms: 4,
    bathrooms: 3,
    area: 380,
    description: 'Located in prime residential zone of Adama. Built with reinforced concrete, perimeter stone walls, guard house, paved driveways, and spacious living spaces with high ceilings.',
    photos: [
      'https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'sold',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
    featured: false,
  }
];

export const ETHIOPIAN_CITIES = [
  'Addis Ababa',
  'Hawassa',
  'Bahir Dar',
  'Mekelle',
  'Adama',
  'Dire Dawa',
  'Gondar',
  'Jimma',
  'Bishoftu',
  'Arba Minch'
];

const STORAGE_KEY = 'chartehomes_listings_v1';

export function getStoredListings(): Listing[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_LISTINGS));
      return INITIAL_LISTINGS;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to load listings from storage', err);
    return INITIAL_LISTINGS;
  }
}

export function saveListingsToStorage(listings: Listing[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
  } catch (err) {
    console.error('Failed to save listings to storage', err);
  }
}
