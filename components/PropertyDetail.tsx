import { Property } from '@/types'
import Link from 'next/link'
import ImageGallery from './ImageGallery'

interface PropertyDetailProps {
  property: Property
}

export default function PropertyDetail({ property }: PropertyDetailProps) {
  const host = property.metadata?.host
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          {property.metadata.title}
        </h1>
        <div className="flex items-center space-x-2 text-gray-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span>{property.metadata.location}</span>
        </div>
      </div>
      
      <ImageGallery property={property} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-6 pb-6 border-b">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {property.metadata.property_type.value}
                </h2>
                <div className="flex items-center space-x-4 text-gray-600">
                  <span>{property.metadata.bedrooms} bedroom{property.metadata.bedrooms !== 1 ? 's' : ''}</span>
                  <span>·</span>
                  <span>{property.metadata.bathrooms} bathroom{property.metadata.bathrooms !== 1 ? 's' : ''}</span>
                  <span>·</span>
                  <span>{property.metadata.max_guests} guest{property.metadata.max_guests !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
            
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mb-4">About this place</h3>
              <div 
                dangerouslySetInnerHTML={{ __html: property.metadata.description }}
                className="text-gray-600"
              />
            </div>
          </div>
          
          {property.metadata.amenities && property.metadata.amenities.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4">Amenities</h3>
              <div className="grid grid-cols-2 gap-4">
                {property.metadata.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">
                  ${property.metadata.price_per_night}
                </span>
                <span className="text-gray-600 ml-2">/ night</span>
              </div>
            </div>
            
            {property.metadata.available && (
              <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg mb-6 text-center font-medium">
                Available for booking
              </div>
            )}
            
            {host && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Hosted by</h3>
                <Link 
                  href={`/hosts/${host.slug}`}
                  className="flex items-center space-x-3 hover:bg-gray-50 p-3 rounded-lg transition-colors"
                >
                  {host.metadata.profile_photo && (
                    <img
                      src={`${host.metadata.profile_photo.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
                      alt={host.metadata.name}
                      className="w-12 h-12 rounded-full object-cover"
                      width={48}
                      height={48}
                    />
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">{host.metadata.name}</p>
                    {host.metadata.member_since && (
                      <p className="text-sm text-gray-600">
                        Member since {new Date(host.metadata.member_since).getFullYear()}
                      </p>
                    )}
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}