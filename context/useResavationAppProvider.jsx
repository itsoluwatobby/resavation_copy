"use client"

import { useContext } from "react"
import { ResavationDataContext } from './ResavationContextApp'

export const useResavationAppProvider = () => {
  return useContext(ResavationDataContext)
}
