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
        id: z.string(),
        properties: z.record(z.any()),
    }))
    .handler(async (profile) => {
        const url = 'https://a.klaviyo.com/api/profile-import';

        const body = {
            data: profile
        }

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/vnd.api+json',
                'Authorization': `Klaviyo-API-Key ${process.env.KLAVIYO_API_KEY}`,
                'Revision': '2025-04-15'
            },
            body: JSON.stringify(body)
        }

        try {
            const response = await fetch(url, options)

            if (!response.ok) {
                throw new Error('Failed to create/update profile')
            }
            
        } catch (error) {
            throw new Error('Failed to create/update profile')
        }
    })