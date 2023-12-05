"use client"

import CheckCards from './CheckCards'
import { useState } from 'react'

const initialState = { propertyCheck: false, tenantCheck: false }
export default function PreSignupForm({ setPreSignupForm, setUserOption }) {
  const [checkOption, setCheckOption] = useState(initialState)
  const options = ['PROPERTY OWNER', 'TENANT']

  const { propertyCheck, tenantCheck } = checkOption

  const handleCheck = (event) => {
    const name = event.target.name
    const checked = event.target.checked
    if(name == 'property'){
      if(!propertyCheck) {
        setCheckOption({propertyCheck: checked, tenantCheck: false})
        setUserOption(options[0])
      } 
      else{
        setCheckOption({propertyCheck: !propertyCheck, tenantCheck: false})
        setUserOption('')
      }
    }
    else if(name == 'tenants'){
      if(!tenantCheck) {
        setCheckOption({propertyCheck: false, tenantCheck: checked})
        setUserOption(options[1])
      } 
      else{
        setCheckOption({propertyCheck: false, tenantCheck: !tenantCheck})
        setUserOption('')
      }
    }
    // else if(name == 'realEstate'){
    //   if(!realEstateCheck) {
    //     setCheckOption({propertyCheck: false, tenantCheck: false, realEstateCheck: checked})
    //     setUserOption(options[2])
    //   } 
    //   else{
    //     setCheckOption({propertyCheck: false, tenantCheck: false, realEstateCheck: !realEstateCheck})
    //     setUserOption('')
    //   }
    // }
  }

  const canNext = [propertyCheck, tenantCheck].some(Boolean)

  return (
    <main className='flex flex-col gap-6 w-full'>
      <div className='flex flex-col gap-3 w-full'>
        <CheckCards
          name={'property'}
          content={'Property Owner'}
          checked={checkOption?.propertyCheck}
          handleCheck={handleCheck}        
        />
        <CheckCards
          content={'Tenants'}
          name={'tenants'}
          checked={checkOption?.tenantCheck}
          handleCheck={handleCheck}    
        />
      </div>

      <button
        disabled={!canNext}
        onClick={() => setPreSignupForm(false)}
        className={`${canNext ? "bg-blue-700 hover:bg-blue-600 active:bg-blue-700" : "bg-gray-500"} p-4 transition-all text-white rounded-md`}
      >
        Next
      </button>
    </main>
  )
}
