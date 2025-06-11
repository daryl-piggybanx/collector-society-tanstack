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
          errorMessage = 'Please enter a valid phone number with country code (e.g., 1800XXXXXXX)'
      }
      
      return { isValid: false, error: errorMessage }
    }

    // validate actual phone number digits
    if (!isValidPhoneNumber(phoneNumber, defaultCountry)) {
      return { 
        isValid: false, 
        error: 'Please enter a valid phone number with country code (e.g., 1800XXXXXXX)' 
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
      error: 'Please enter a valid phone number with country code (e.g., 1800XXXXXXX)' 
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
