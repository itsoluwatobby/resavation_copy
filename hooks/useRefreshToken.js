"use client"

import authAxios from '../lib/authAxios'
import { toast } from 'react-hot-toast'
import { ErrorStyle } from '../lib/helperFunction'
import { useResavationAppProvider } from '@/context/useResavationAppProvider'

export const useRefreshToken = () => {
  const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('user_refresh') : null
  const token = typeof window !== 'undefined' ? localStorage.getItem('user_token') : null
  const { setCredentials } = useResavationAppProvider()

  const newAccessToken = async() => {
    try{
      const res = await authAxios.post('/refreshToken', {refreshToken})
      setCredentials(prev => ({
        ...prev, accessToken: res?.data?.accessToken,
        refreshToken: res?.data?.refreshToken, type: res?.data?.type
      }))
      localStorage.setItem('user_token', res?.data?.accessToken)
      localStorage.setItem('user_refresh', res?.data?.refreshToken)
      return res?.data
    }
    catch(error){
      console.log(error)
      toast.error()
    }

  }
  return newAccessToken
}
