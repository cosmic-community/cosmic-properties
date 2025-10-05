import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Get all properties with host information
export async function getAllProperties() {
  try {
    const response = await cosmic.objects
      .find({ type: 'properties' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch properties');
  }
}

// Get a single property by slug
export async function getPropertyBySlug(slug: string) {
  try {
    const response = await cosmic.objects.findOne({
      type: 'properties',
      slug
    }).depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch property');
  }
}

// Get all hosts
export async function getAllHosts() {
  try {
    const response = await cosmic.objects
      .find({ type: 'hosts' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch hosts');
  }
}

// Get a single host by slug
export async function getHostBySlug(slug: string) {
  try {
    const response = await cosmic.objects.findOne({
      type: 'hosts',
      slug
    });
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch host');
  }
}

// Get properties by host
export async function getPropertiesByHost(hostId: string) {
  try {
    const response = await cosmic.objects
      .find({
        type: 'properties',
        'metadata.host': hostId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch properties by host');
  }
  }

// Get user by email
export async function getUserByEmail(email: string) {
  try {
    const response = await cosmic.objects.findOne({
      type: 'users',
      'metadata.email': email
    });
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch user');
  }
}

// Create new user
export async function createUser(userData: {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
}) {
  try {
    const response = await cosmic.objects.insertOne({
      title: `${userData.firstName} ${userData.lastName}`,
      type: 'users',
      status: 'published',
      metadata: {
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        password_hash: userData.passwordHash,
        member_since: new Date().toISOString().split('T')[0]
      }
    });
    
    return response.object;
  } catch (error) {
    throw new Error('Failed to create user');
  }
}