import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, Home, Building } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { FormData } from "@/components/form/types"
import {
  validateStreetAddress,
  validateCity,
  validateState,
  validatePostalCode,
  validateCountry,
  createFieldState,
  updateFieldState,
  type FieldValidationState
} from "@/utils/validation"

interface ShippingAddressProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export default function ShippingAddress({ formData, updateFormData }: ShippingAddressProps) {
  // Local validation state for each field
  const [streetState, setStreetState] = useState<FieldValidationState>(() => 
    createFieldState(formData.street_address || '')
  )
  const [addressLine2State, setAddressLine2State] = useState<FieldValidationState>(() => 
    createFieldState(formData.address_line_2 || '')
  )
  const [cityState, setCityState] = useState<FieldValidationState>(() => 
    createFieldState(formData.city || '')
  )
  const [stateState, setStateState] = useState<FieldValidationState>(() => 
    createFieldState(formData.state || '')
  )
  const [postalState, setPostalState] = useState<FieldValidationState>(() => 
    createFieldState(formData.postal_code || '')
  )
  const [countryState, setCountryState] = useState<FieldValidationState>(() => 
    createFieldState(formData.country || 'US')
  )

  // Sync with form data when it changes externally
  useEffect(() => {
    if (formData.street_address !== streetState.value) {
      setStreetState(prev => updateFieldState(prev, { value: formData.street_address || '' }))
    }
  }, [formData.street_address])

  useEffect(() => {
    if (formData.address_line_2 !== addressLine2State.value) {
      setAddressLine2State(prev => updateFieldState(prev, { value: formData.address_line_2 || '' }))
    }
  }, [formData.address_line_2])

  useEffect(() => {
    if (formData.city !== cityState.value) {
      setCityState(prev => updateFieldState(prev, { value: formData.city || '' }))
    }
  }, [formData.city])

  useEffect(() => {
    if (formData.state !== stateState.value) {
      setStateState(prev => updateFieldState(prev, { value: formData.state || '' }))
    }
  }, [formData.state])

  useEffect(() => {
    if (formData.postal_code !== postalState.value) {
      setPostalState(prev => updateFieldState(prev, { value: formData.postal_code || '' }))
    }
  }, [formData.postal_code])

  useEffect(() => {
    if (formData.country !== countryState.value) {
      setCountryState(prev => updateFieldState(prev, { value: formData.country || 'US' }))
    }
  }, [formData.country])

  // Field change handlers
  const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setStreetState(prev => updateFieldState(prev, { 
      value, 
      isTouched: true 
    }))
    updateFormData({ street_address: value })
  }

  const handleStreetBlur = () => {
    const validation = validateStreetAddress(streetState.value)
    setStreetState(prev => updateFieldState(prev, {
      error: validation.error,
      isValid: validation.isValid
    }))
  }

  const handleAddressLine2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAddressLine2State(prev => updateFieldState(prev, { 
      value, 
      isTouched: true 
    }))
    updateFormData({ address_line_2: value })
  }

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCityState(prev => updateFieldState(prev, { 
      value, 
      isTouched: true 
    }))
    updateFormData({ city: value })
  }

  const handleCityBlur = () => {
    const validation = validateCity(cityState.value)
    setCityState(prev => updateFieldState(prev, {
      error: validation.error,
      isValid: validation.isValid
    }))
  }

  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setStateState(prev => updateFieldState(prev, { 
      value, 
      isTouched: true 
    }))
    updateFormData({ state: value })
  }

  const handleStateBlur = () => {
    const validation = validateState(stateState.value, countryState.value)
    setStateState(prev => updateFieldState(prev, {
      error: validation.error,
      isValid: validation.isValid
    }))
  }

  const handlePostalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPostalState(prev => updateFieldState(prev, { 
      value, 
      isTouched: true 
    }))
    updateFormData({ postal_code: value })
  }

  const handlePostalBlur = () => {
    const validation = validatePostalCode(postalState.value, countryState.value)
    setPostalState(prev => updateFieldState(prev, {
      error: validation.error,
      isValid: validation.isValid
    }))
  }

  const handleCountryChange = (value: string) => {
    setCountryState(prev => updateFieldState(prev, { 
      value, 
      isTouched: true 
    }))
    updateFormData({ country: value })
    
    // Re-validate postal code when country changes
    if (postalState.value) {
      const validation = validatePostalCode(postalState.value, value)
      setPostalState(prev => updateFieldState(prev, {
        error: validation.error,
        isValid: validation.isValid
      }))
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  const countries = [
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'AU', label: 'Australia' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
    { value: 'JP', label: 'Japan' },
  ]

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit">
      <motion.p variants={itemVariants} className="text-red-100/80 my-6">
        Please provide your shipping address for delivery of your PiggyBanx collection.
      </motion.p>
      
      <motion.div variants={itemVariants} className="space-y-6 my-6">
        {/* Street Address */}
        <div className="space-y-3">
          <Label htmlFor="street_address" className="text-red-200">
            Street Address *
          </Label>
          <div className="flex items-center">
            <Home size={18} className="text-red-300 mr-2" />
            <Input
              id="street_address"
              name="street_address"
              type="text"
              value={streetState.value}
              onChange={handleStreetChange}
              onBlur={handleStreetBlur}
              placeholder="123 Main Street"
              className={`border-red-400/30 bg-red-950/40 text-red-100 placeholder:text-red-300/50 focus:border-red-400 focus:ring-red-400 ${
                streetState.isTouched && !streetState.isValid ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''
              }`}
              required
              aria-invalid={streetState.isTouched && !streetState.isValid}
              aria-describedby={streetState.error ? "street-error" : undefined}
            />
          </div>
          {streetState.isTouched && streetState.error && (
            <p id="street-error" className="text-red-400 text-sm mt-1">
              {streetState.error}
            </p>
          )}
        </div>

        {/* Address Line 2 (Optional) */}
        <div className="space-y-3">
          <Label htmlFor="address_line_2" className="text-red-200">
            Address Line 2 (Optional)
          </Label>
          <div className="flex items-center">
            <Building size={18} className="text-red-300 mr-2" />
            <Input
              id="address_line_2"
              name="address_line_2"
              type="text"
              value={addressLine2State.value}
              onChange={handleAddressLine2Change}
              placeholder="Apt, Suite, Floor, etc."
              className="border-red-400/30 bg-red-950/40 text-red-100 placeholder:text-red-300/50 focus:border-red-400 focus:ring-red-400"
            />
          </div>
        </div>

        {/* City */}
        <div className="space-y-3">
          <Label htmlFor="city" className="text-red-200">
            City *
          </Label>
          <div className="flex items-center">
            <Building size={18} className="text-red-300 mr-2" />
            <Input
              id="city"
              name="city"
              type="text"
              value={cityState.value}
              onChange={handleCityChange}
              onBlur={handleCityBlur}
              placeholder="City"
              className={`border-red-400/30 bg-red-950/40 text-red-100 placeholder:text-red-300/50 focus:border-red-400 focus:ring-red-400 ${
                cityState.isTouched && !cityState.isValid ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''
              }`}
              required
              aria-invalid={cityState.isTouched && !cityState.isValid}
              aria-describedby={cityState.error ? "city-error" : undefined}
            />
          </div>
          {cityState.isTouched && cityState.error && (
            <p id="city-error" className="text-red-400 text-sm mt-1">
              {cityState.error}
            </p>
          )}
        </div>

        {/* State and Postal Code Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* State */}
          <div className="space-y-3">
            <Label htmlFor="state" className="text-red-200">
              {countryState.value === 'US' ? 'State' : 'State/Province'} *
            </Label>
            <div className="flex items-center">
              <MapPin size={18} className="text-red-300 mr-2" />
              <Input
                id="state"
                name="state"
                type="text"
                value={stateState.value}
                onChange={handleStateChange}
                onBlur={handleStateBlur}
                placeholder={countryState.value === 'US' ? 'CA or California' : 'State/Province'}
                className={`border-red-400/30 bg-red-950/40 text-red-100 placeholder:text-red-300/50 focus:border-red-400 focus:ring-red-400 ${
                  stateState.isTouched && !stateState.isValid ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''
                }`}
                required
                aria-invalid={stateState.isTouched && !stateState.isValid}
                aria-describedby={stateState.error ? "state-error" : undefined}
              />
            </div>
            {stateState.isTouched && stateState.error && (
              <p id="state-error" className="text-red-400 text-sm mt-1">
                {stateState.error}
              </p>
            )}
          </div>

          {/* Postal Code */}
          <div className="space-y-3">
            <Label htmlFor="postal_code" className="text-red-200">
              {countryState.value === 'US' ? 'ZIP Code' : 'Postal Code'} *
            </Label>
            <Input
              id="postal_code"
              name="postal_code"
              type="text"
              value={postalState.value}
              onChange={handlePostalChange}
              onBlur={handlePostalBlur}
              placeholder={
                countryState.value === 'US' ? '12345 or 12345-6789' :
                countryState.value === 'CA' ? 'A1A 1A1' : 'Postal Code'
              }
              className={`border-red-400/30 bg-red-950/40 text-red-100 placeholder:text-red-300/50 focus:border-red-400 focus:ring-red-400 ${
                postalState.isTouched && !postalState.isValid ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''
              }`}
              required
              aria-invalid={postalState.isTouched && !postalState.isValid}
              aria-describedby={postalState.error ? "postal-error" : undefined}
            />
            {postalState.isTouched && postalState.error && (
              <p id="postal-error" className="text-red-400 text-sm mt-1">
                {postalState.error}
              </p>
            )}
          </div>
        </div>

        {/* Country */}
        <div className="space-y-3">
          <Label htmlFor="country" className="text-red-200">
            Country *
          </Label>
          <Select value={countryState.value} onValueChange={handleCountryChange}>
            <SelectTrigger className="border-red-400/30 bg-red-950/40 text-red-100 focus:border-red-400 focus:ring-red-400">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent className="bg-red-950/90 border-red-400/30">
              {countries.map((country) => (
                <SelectItem 
                  key={country.value} 
                  value={country.value}
                  className="text-red-100 focus:bg-red-900/50 focus:text-red-100"
                >
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </motion.div>
    </motion.div>
  )
}