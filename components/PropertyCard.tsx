import Link from 'next/link'
import { Property } from '@/types'

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const featuredImage = property.metadata?.featured_image
  
  if (!featuredImage) {
    return null
  }
  
  return (
    <Link href={`/properties/${property.slug}`} className="group">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={`${featuredImage.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={property.metadata.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            width={400}
            height={300}
          />
          {property.metadata.available && (
            <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-900 shadow-md">
              Available
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">
              {property.metadata.title}
            </h3>
          </div>
          
          <p className="text-gray-600 text-sm mb-2">
            {property.metadata.location}
          </p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
            <span>{property.metadata.bedrooms} bed{property.metadata.bedrooms !== 1 ? 's' : ''}</span>
            <span>·</span>
            <span>{property.metadata.bathrooms} bath{property.metadata.bathrooms !== 1 ? 's' : ''}</span>
            <span>·</span>
            <span>{property.metadata.max_guests} guest{property.metadata.max_guests !== 1 ? 's' : ''}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-900">
                ${property.metadata.price_per_night}
              </span>
              <span className="text-gray-600 text-sm"> / night</span>
            </div>
            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
              {property.metadata.property_type.value}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}