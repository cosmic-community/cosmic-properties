'use client'

import { Property } from '@/types'
import { useState } from 'react'

interface ImageGalleryProps {
  property: Property
}

export default function ImageGallery({ property }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  
  const featuredImage = property.metadata?.featured_image
  const gallery = property.metadata?.gallery || []
  const allImages = featuredImage ? [featuredImage, ...gallery] : gallery
  
  if (allImages.length === 0) {
    return null
  }
  
  return (
    <div className="space-y-4">
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
        <img
          src={`${allImages[selectedImage].imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
          alt={property.metadata.title}
          className="w-full h-full object-cover"
          width={800}
          height={450}
        />
      </div>
      
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-[4/3] rounded-lg overflow-hidden ${
                selectedImage === index 
                  ? 'ring-2 ring-primary' 
                  : 'opacity-70 hover:opacity-100'
              } transition-all`}
            >
              <img
                src={`${image.imgix_url}?w=400&h=300&fit=crop&auto=format,compress`}
                alt={`${property.metadata.title} - Image ${index + 1}`}
                className="w-full h-full object-cover"
                width={200}
                height={150}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}