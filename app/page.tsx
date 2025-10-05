import { getAllProperties } from '@/lib/cosmic'
import { Property } from '@/types'
import PropertyGrid from '@/components/PropertyGrid'
import Hero from '@/components/Hero'

export const revalidate = 60

export default async function HomePage() {
  const properties = await getAllProperties() as Property[]
  
  return (
    <div>
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Explore Amazing Places
          </h2>
          <p className="text-gray-600">
            Discover unique vacation rentals around the world
          </p>
        </div>
        
        {properties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No properties available at this time.</p>
          </div>
        ) : (
          <PropertyGrid properties={properties} />
        )}
      </div>
    </div>
  )
}