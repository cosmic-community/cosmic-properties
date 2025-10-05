import { Host, Property } from '@/types'
import PropertyGrid from './PropertyGrid'

interface HostProfileProps {
  host: Host
  properties: Property[]
}

export default function HostProfile({ host, properties }: HostProfileProps) {
  const profilePhoto = host.metadata?.profile_photo
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-8">
          {profilePhoto && (
            <img
              src={`${profilePhoto.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
              alt={host.metadata.name}
              className="w-32 h-32 rounded-full object-cover shadow-lg"
              width={128}
              height={128}
            />
          )}
          
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {host.metadata.name}
            </h1>
            
            {host.metadata.member_since && (
              <p className="text-gray-600 mb-4">
                Member since {new Date(host.metadata.member_since).toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
            )}
            
            {host.metadata.bio && (
              <p className="text-gray-700 leading-relaxed max-w-3xl">
                {host.metadata.bio}
              </p>
            )}
            
            <div className="mt-6 flex flex-wrap gap-4 justify-center sm:justify-start">
              {host.metadata.email && (
                <a
                  href={`mailto:${host.metadata.email}`}
                  className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Contact Host
                </a>
              )}
              
              {host.metadata.phone && (
                <a
                  href={`tel:${host.metadata.phone}`}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  {host.metadata.phone}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Properties hosted by {host.metadata.name}
        </h2>
        
        {properties.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-600">This host currently has no available properties.</p>
          </div>
        ) : (
          <PropertyGrid properties={properties} />
        )}
      </div>
    </div>
  )
}