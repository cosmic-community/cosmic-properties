// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status?: string;
  thumbnail?: string;
}

// Property Type Literal
export type PropertyType = 'apartment' | 'house' | 'cabin' | 'loft' | 'villa';

// Host interface
export interface Host extends CosmicObject {
  type: 'hosts';
  metadata: {
    name: string;
    bio?: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    email: string;
    phone?: string;
    member_since?: string;
  };
}

// Property interface
export interface Property extends CosmicObject {
  type: 'properties';
  metadata: {
    title: string;
    description: string;
    featured_image: {
      url: string;
      imgix_url: string;
    };
    gallery?: Array<{
      url: string;
      imgix_url: string;
    }>;
    price_per_night: number;
    property_type: {
      key: PropertyType;
      value: string;
    };
    location: string;
    bedrooms: number;
    bathrooms: number;
    max_guests: number;
    amenities?: string[];
    host: Host;
    available?: boolean;
  };
}

// API Response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}

// Filter types
export interface PropertyFilters {
  propertyType?: PropertyType;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  amenities?: string[];
  location?: string;
}