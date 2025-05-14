export type KlaviyoProfile = {
  id: string
  type: 'profile'
  attributes: {
    email: string
    phone_number?: string
    first_name?: string
    last_name?: string
    location?: Record<string, any>
    properties?: Record<string, any>
  }
}