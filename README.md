# 🏡 Airbnb Property Showcase

![App Banner](https://imgix.cosmicjs.com/f5052830-a1af-11f0-8dcc-651091f6a7c0-photo-1568605114967-8130f3a36994-1759643752339.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive vacation rental platform built with Next.js 15 and Cosmic CMS. Browse beautiful properties, view detailed information, and connect with hosts - all powered by a flexible headless CMS.

## ✨ Features

- 🏠 **Property Listings** - Browse available vacation rentals with rich details
- 🔍 **Advanced Filtering** - Filter by type, price, location, and amenities
- 📸 **Image Galleries** - High-quality property photos with full-screen viewing
- 👤 **Host Profiles** - Learn about property owners and their portfolios
- 💰 **Pricing Display** - Clear nightly rates and property specifications
- 📱 **Responsive Design** - Optimized for all screen sizes
- 🎨 **Modern UI** - Clean, intuitive interface with smooth interactions
- ⚡ **Fast Performance** - Optimized images and efficient data fetching
- 🔄 **Real-time Updates** - Content changes in Cosmic appear instantly

## 🚀 Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=68e20808f3248c5d9f95048f&clone_repository=68e20ac3f3248c5d9f9504a3)

## 📝 Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create an Airbnb clone"

### Code Generation Prompt

> "Based on the content model I created for 'Create an Airbnb clone', now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless content management
- **Inter Font** - Modern typography
- **imgix** - Image optimization and delivery

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- A Cosmic account with the Airbnb content model

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd airbnb-property-showcase
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching All Properties

```typescript
import { cosmic } from '@/lib/cosmic'

const response = await cosmic.objects
  .find({ type: 'properties' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const properties = response.objects
```

### Getting a Single Property with Host

```typescript
const response = await cosmic.objects.findOne({
  type: 'properties',
  slug: 'property-slug'
}).depth(1)

const property = response.object
const host = property.metadata.host
```

### Filtering Properties by Type

```typescript
const response = await cosmic.objects
  .find({
    type: 'properties',
    'metadata.property_type.key': 'apartment'
  })
  .depth(1)
```

## 🌐 Cosmic CMS Integration

This application uses Cosmic as a headless CMS to manage:

### Object Types

1. **Properties** (`properties`)
   - Title, description, and featured image
   - Gallery images
   - Price per night
   - Property type (Apartment, House, Cabin, Loft, Villa)
   - Location details
   - Bedrooms, bathrooms, max guests
   - Amenities checklist
   - Connected host (object metafield)
   - Availability status

2. **Hosts** (`hosts`)
   - Name and bio
   - Profile photo
   - Email and phone
   - Member since date

### Content Relationships

Properties are connected to Hosts using Cosmic's object metafield feature. When fetching properties with `depth(1)`, the host information is automatically included in the response.

## 📦 Deployment Options

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Click the deploy button above
2. Connect your repository
3. Add environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. Click the deploy button above
2. Connect your repository
3. Add environment variables in Netlify dashboard
4. Deploy!

### Environment Variables

Make sure to set these environment variables in your hosting platform:

- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read key
- `COSMIC_WRITE_KEY` - Your Cosmic write key (optional, only needed for write operations)

## 📖 Learn More

- [Cosmic Documentation](https://www.cosmicjs.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

<!-- README_END -->