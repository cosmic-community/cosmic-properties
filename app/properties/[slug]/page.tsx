// app/properties/[slug]/page.tsx
import { getPropertyBySlug, getAllProperties } from '@/lib/cosmic'
import { Property } from '@/types'
import { notFound } from 'next/navigation'
import PropertyDetail from '@/components/PropertyDetail'

export const revalidate = 60

export async function generateStaticParams() {
  const properties = await getAllProperties() as Property[]
  
  return properties.map((property) => ({
    slug: property.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const property = await getPropertyBySlug(slug) as Property | null
  
  if (!property) {
    return {
      title: 'Property Not Found',
    }
  }
  
  return {
    title: `${property.metadata.title} - Airbnb Property Showcase`,
    description: property.metadata.description.substring(0, 160),
  }
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const property = await getPropertyBySlug(slug) as Property | null
  
  if (!property) {
    notFound()
  }
  
  return <PropertyDetail property={property} />
}