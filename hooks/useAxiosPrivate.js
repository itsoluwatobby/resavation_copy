"use client"

import { useEffect } from 'react'
import { axiosPrivate } from '../lib/authAxios'
import { useRefreshToken } from './useRefreshToken'

/**
 * @description - useAxiosPrivate is an axios api in which the token have beeen attached to already
 * it is expected to perform an automatic refetch in cases where the tken expires
 * 
 * @howTo - await axiosPrivate.post(url, <option>)
 * option includes the data you would like to send and may be headers option if need be 
 * 
 * @note - YOU DO NOT NEED TO ATTACH THE TOKEN
 * @returns axios (axiosPrivate) object for making fetch requests
 */

export const useAxiosPrivate = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem('user_token') : null;
  const newAccessToken = useRefreshToken()

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
          if (!config.headers['Authorization']) {
              config.headers['Authorization'] = `Bearer ${token}`;
          }
          return config;
      }, (error) => Promise.reject(error)
  );

      const responseIntercept = axiosPrivate.interceptors.response.use(
        response => response,
        async (error) => {
            const prevRequest = error?.config;
            if (error?.response?.status === 403 && !prevRequest?.sent) {
                prevRequest.sent = true;
                const newToken = await newAccessToken();
                prevRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return axiosPrivate(prevRequest);
            }
            return Promise.reject(error);
        }
    );

    return () => {
        axiosPrivate.interceptors.request.eject(requestIntercept);
        axiosPrivate.interceptors.response.eject(responseIntercept);
    }
  }, [newAccessToken])

  return axiosPrivate
}
