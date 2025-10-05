// app/hosts/[slug]/page.tsx
import { getHostBySlug, getPropertiesByHost, getAllHosts } from '@/lib/cosmic'
import { Host, Property } from '@/types'
import { notFound } from 'next/navigation'
import HostProfile from '@/components/HostProfile'

export const revalidate = 60

export async function generateStaticParams() {
  const hosts = await getAllHosts() as Host[]
  
  return hosts.map((host) => ({
    slug: host.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const host = await getHostBySlug(slug) as Host | null
  
  if (!host) {
    return {
      title: 'Host Not Found',
    }
  }
  
  return {
    title: `${host.metadata.name} - Host Profile`,
    description: host.metadata.bio || `View properties hosted by ${host.metadata.name}`,
  }
}

export default async function HostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const host = await getHostBySlug(slug) as Host | null
  
  if (!host) {
    notFound()
  }
  
  const properties = await getPropertiesByHost(host.id) as Property[]
  
  return <HostProfile host={host} properties={properties} />
}