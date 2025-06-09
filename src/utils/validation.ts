import { 
  parsePhoneNumber, 
  isValidPhoneNumber, 
  isPossiblePhoneNumber,
  validatePhoneNumberLength,
  AsYouType 
} from 'libphonenumber-js'

export interface ValidationResult {
  isValid: boolean
  error?: string
  formattedValue?: string
}

export interface FieldValidationState {
  value: string
  error?: string
  isValid: boolean
  isTouched: boolean
}

// Email validation
export const validateEmail = (email: string): ValidationResult => {
  if (!email.trim()) {
    return { isValid: false, error: 'Email is required' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' }
  }

  return { isValid: true }
}

export const validatePhoneNumber = (phoneNumber: string, defaultCountry: string = 'US'): ValidationResult => {
  if (!phoneNumber.trim()) {
    return { isValid: true } // phone is optional
  }

  try {
    // check if a possible phone number (length validation)
    if (!isPossiblePhoneNumber(phoneNumber, defaultCountry)) {
      const lengthValidation = validatePhoneNumberLength(phoneNumber, defaultCountry)
      
      let errorMessage = 'Please enter a valid phone number with country code'
      
      switch (lengthValidation) {
        case 'TOO_SHORT':
          errorMessage = 'Phone number is too short'
          break
        case 'TOO_LONG':
          errorMessage = 'Phone number is too long'
          break
        case 'INVALID_COUNTRY':
          errorMessage = 'Invalid country code'
          break
        case 'INVALID_LENGTH':
          errorMessage = 'Invalid phone number length'
          break
        default:
          errorMessage = 'Please enter a valid phone number with country code (e.g., +1 808 728 6347)'
      }
      
      return { isValid: false, error: errorMessage }
    }

    // validate actual phone number digits
    if (!isValidPhoneNumber(phoneNumber, defaultCountry)) {
      return { 
        isValid: false, 
        error: 'Please enter a valid phone number with country code (e.g., +1 808 728 6347)' 
      }
    }

    // parse for formatting
    const parsed = parsePhoneNumber(phoneNumber, defaultCountry)
    
    if (!parsed) {
      return { 
        isValid: false, 
        error: 'Unable to parse phone number' 
      }
    }

    // return E.164 format for Klaviyo
    return { 
      isValid: true, 
      formattedValue: parsed.number // is already in E.164 format
    }
  } catch (error) {
    return { 
      isValid: false, 
      error: 'Please enter a valid phone number with country code (e.g., +1 808 728 6347)' 
    }
  }
}

export const formatPhoneNumberAsYouType = (value: string, country: string = 'US'): string => {
  if (!value) return value
  
  try {
    const formatter = new AsYouType(country)
    return formatter.input(value)
  } catch (error) {
    // if formatting fails, return original value
    return value
  }
}

export const formatPhoneToE164 = (phoneNumber: string, defaultCountry: string = 'US'): string => {
  if (!phoneNumber.trim()) return phoneNumber

  try {
    const parsed = parsePhoneNumber(phoneNumber, defaultCountry)
    if (parsed && parsed.isValid()) {
      return parsed.number // E.164 format
    }
  } catch (error) {
    // If parsing fails, return original value
  }
  
  return phoneNumber
}

// Get formatted phone number for display
export const getFormattedPhoneNumber = (phoneNumber: string, format: 'international' | 'national' = 'international', defaultCountry: string = 'US'): string => {
  if (!phoneNumber.trim()) return phoneNumber

  try {
    const parsed = parsePhoneNumber(phoneNumber, defaultCountry)
    if (parsed && parsed.isValid()) {
      return format === 'international' 
        ? parsed.formatInternational() 
        : parsed.formatNational()
    }
  } catch (error) {
    // If parsing fails, return original value
  }
  
  return phoneNumber
}

// check if phone number is possible (length validation only)
export const isPhoneNumberPossible = (phoneNumber: string, defaultCountry: string = 'US'): boolean => {
  if (!phoneNumber.trim()) return true // Optional field
  
  try {
    return isPossiblePhoneNumber(phoneNumber, defaultCountry)
  } catch (error) {
    return false
  }
}

// ensure phone number starts with + if it doesn't already
export const ensurePlusPrefix = (phoneNumber: string): string => {
  if (!phoneNumber.trim()) return phoneNumber
  
  // Remove any existing + and whitespace, then add + back
  const cleaned = phoneNumber.replace(/^\+?\s*/, '')
  return cleaned ? `+${cleaned}` : ''
}


export const validateStreetAddress = (address: string): ValidationResult => {
  if (!address.trim()) {
    return { isValid: false, error: 'Street address is required' }
  }

  if (address.trim().length < 5) {
    return { isValid: false, error: 'Please enter a complete street address' }
  }

  return { isValid: true }
}

export const validateCity = (city: string): ValidationResult => {
  if (!city.trim()) {
    return { isValid: false, error: 'City is required' }
  }

  if (city.trim().length < 2) {
    return { isValid: false, error: 'Please enter a valid city name' }
  }

  // Basic check for valid characters (letters, spaces, apostrophes, hyphens)
  const cityRegex = /^[a-zA-Z\s'-]+$/
  if (!cityRegex.test(city.trim())) {
    return { isValid: false, error: 'City name contains invalid characters' }
  }

  return { isValid: true }
}

export const validateState = (state: string, country: string = 'US'): ValidationResult => {
  if (!state.trim()) {
    return { isValid: false, error: 'State/Province is required' }
  }

  if (country === 'US') {
    // US state validation (2-letter code or full name)
    const usStates = [
      'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
      'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
      'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
      'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
      'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
      'DC' // District of Columbia
    ]
    
    const upperState = state.trim().toUpperCase()
    if (state.length === 2 && !usStates.includes(upperState)) {
      return { isValid: false, error: 'Please enter a valid US state code' }
    }
  }

  return { isValid: true }
}

export const validatePostalCode = (postalCode: string, country: string = 'US'): ValidationResult => {
  if (!postalCode.trim()) {
    return { isValid: false, error: 'ZIP/Postal code is required' }
  }

  if (country === 'US') {
    // US ZIP code validation (5 digits or 5+4 format)
    const zipRegex = /^\d{5}(-\d{4})?$/
    if (!zipRegex.test(postalCode.trim())) {
      return { isValid: false, error: 'Please enter a valid US ZIP code (e.g., 12345 or 12345-6789)' }
    }
  } else if (country === 'CA') {
    // Canadian postal code validation (A1A 1A1 format)
    const canadaRegex = /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i
    if (!canadaRegex.test(postalCode.trim())) {
      return { isValid: false, error: 'Please enter a valid Canadian postal code (e.g., A1A 1A1)' }
    }
  } else {
    // Generic postal code validation for other countries
    if (postalCode.trim().length < 3 || postalCode.trim().length > 10) {
      return { isValid: false, error: 'Please enter a valid postal code' }
    }
  }

  return { isValid: true }
}

export const validateCountry = (country: string): ValidationResult => {
  if (!country.trim()) {
    return { isValid: false, error: 'Country is required' }
  }

  return { isValid: true }
}

// Helper function to convert country code to full country name for Klaviyo
export const getCountryNameForKlaviyo = (countryCode: string): string => {
  const countryMap: Record<string, string> = {
    'US': 'United States',
    'CA': 'Canada',
    'GB': 'United Kingdom',
    'AU': 'Australia',
    'DE': 'Germany',
    'FR': 'France',
    'JP': 'Japan',
  }
  
  return countryMap[countryCode] || countryCode
}

// Helper function to format state for Klaviyo (US states should be 2-letter codes)
export const formatStateForKlaviyo = (state: string, country: string = 'US'): string => {
  if (country === 'US') {
    // Convert to uppercase 2-letter code if it's a US state
    const stateUpper = state.trim().toUpperCase()
    if (stateUpper.length === 2) {
      return stateUpper
    }
    // If it's a full state name, we could add mapping logic here
    return state.trim()
  }
  
  return state.trim()
}

// validation state management helpers
export const createFieldState = (initialValue: string = ''): FieldValidationState => ({
  value: initialValue,
  error: undefined,
  isValid: true,
  isTouched: false
})

export const updateFieldState = (
  currentState: FieldValidationState,
  updates: Partial<FieldValidationState>
): FieldValidationState => ({
  ...currentState,
  ...updates
})
