import { createServerFn } from '@tanstack/react-start'
import type { KlaviyoProfile } from './types'
import { z } from 'zod'

export const getProfileByEmail = createServerFn({ method: 'GET' })
  .validator(z.object({
    email: z.string().email()
  }))
  .handler(async ({ data }) => {
    const url = `https://a.klaviyo.com/api/profiles?filter=equals(email,"${data.email}")`;

    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Authorization': `Klaviyo-API-Key ${process.env.KLAVIYO_API_KEY}`,
        'Revision': '2025-04-15'
      }
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error('Failed to fetch profile');
        }

        const json = await response.json();
        const profile = json.data[0];                    

        // optionally, destructure only the desired fields
        const { type, id, attributes } = profile as KlaviyoProfile;

        // slimmed-down object
        return { type, id, attributes };
    } catch (error) {
        throw new Error('Failed to fetch profile')
    }
  })

export const createUpdateProfile = createServerFn({ method: 'POST' })
  .validator(z.object({
    email: z.string().email(),
    phone_number: z.string().optional(),
    first_name: z.string(),
    last_name: z.string(),
    created: z.string().optional(),
    updated: z.string(),
    marketing_consent: z.boolean(),
    discord_username: z.string().optional(),
    piece_count: z.string().optional(),
    favorite_variation: z.string().optional(),
    collect_preferences: z.array(z.string()).optional(),
    communication_preference: z.string().optional(),
    instagram_handle: z.string().optional(),
    collection_reason: z.string().optional(),
    interests: z.string().optional(),
    first_piece: z.string().optional(),
    community_experience: z.string().optional(),
    improvements: z.string().optional()
  }))
  .handler(async ({ data }) => {
    const url = 'https://a.klaviyo.com/api/profile-import';

    console.log('test data: ', data);

    // Transform form data into Klaviyo format
    const klaviyoData = {
      data: {
        type: "profile",
        attributes: {
          email: data.email,
          phone_number: data.phone_number,
          first_name: data.first_name,
          last_name: data.last_name,
          created: data.created,
          updated: data.updated,
          properties: {
            '$phone_number_region': data.phone_number ? 'US' : null,
            '$source': 'New Collector Form',
            '$consent_method': 'Custom Klaviyo Form',
            '$consent': data.phone_number ? ['email', 'sms'] : ['email'],
            '$consent_timestamp': new Date().toISOString(),
            'Accepts Marketing': data.marketing_consent,
            'Discord-Username': data.discord_username,
            'of-Pieces': data.piece_count,
            'Favorite-Variation': data.favorite_variation,
            'Collection-Category-1': data.collect_preferences?.[0],
            'Communication-Preference': data.communication_preference,
            'Instagram Handle': data.instagram_handle,
            'Collection Reason': data.collection_reason,
            'Interests': data.interests,
            'First Piece': data.first_piece,
            'Community Experience': data.community_experience,
            'Improve Experience': data.improvements
          }
        }
      }
    };

    console.log('test payload to klaviyo: ', klaviyoData);

    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Klaviyo-API-Key ${process.env.KLAVIYO_API_KEY}`,
        'Revision': '2025-04-15'
      },
      body: JSON.stringify(klaviyoData)
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const json = await response.json();
      return json;
    } catch (error) {
      throw new Error('Failed to create/update profile');
    }
  });