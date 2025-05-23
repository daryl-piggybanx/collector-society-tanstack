import { createServerFn } from '@tanstack/react-start'
import type { KlaviyoProfile } from './types'
import { z } from 'zod'
import { parsePhoneNumber } from 'libphonenumber-js'

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

    const properties: Record<string, any> = {
      '$source': 'New Collector Form',
      '$consent_method': 'Custom Klaviyo Form',
      '$consent': data.phone_number ? ['email', 'sms'] : ['email'],
      '$consent_timestamp': new Date().toISOString(),
      'Accepts Marketing': data.marketing_consent,
    };

    // Add optional properties only if they have values
    if (data.phone_number) {
      properties['$phone_number_region'] = parsePhoneNumber(data.phone_number).country;
    }
    if (data.discord_username) {
      properties['Discord-Username'] = data.discord_username;
    }
    if (data.piece_count) {
      properties['of-Pieces'] = data.piece_count;
    }
    if (data.favorite_variation) {
      properties['Favorite-Variation'] = data.favorite_variation;
    }
    if (data.collect_preferences?.[0]) {
      properties['Collection-Category-1'] = data.collect_preferences[0];
    }
    if (data.communication_preference) {
      properties['Communication-Preference'] = data.communication_preference;
    }
    if (data.instagram_handle) {
      properties['Instagram Handle'] = data.instagram_handle;
    }
    if (data.collection_reason) {
      properties['Collection Reason'] = data.collection_reason;
    }
    if (data.interests) {
      properties['Interests'] = data.interests;
    }
    if (data.first_piece) {
      properties['First Piece'] = data.first_piece;
    }
    if (data.community_experience) {
      properties['Community Experience'] = data.community_experience;
    }
    if (data.improvements) {
      properties['Improve Experience'] = data.improvements;
    }

    const klaviyoData = {
      data: {
        type: "profile",
        attributes: {
          email: data.email,
          phone_number: data.phone_number ? parsePhoneNumber(data.phone_number).format('E.164') : undefined,
          first_name: data.first_name,
          last_name: data.last_name,
          properties
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
        const errorText = await response.text();
        console.error('Klaviyo API Error:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        throw new Error(`Klaviyo API Error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const json = await response.json();
      return json;
    } catch (error: unknown) {
      console.error('Full error details:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new Error(`Failed to create/update profile: ${errorMessage}`);
    }
  });