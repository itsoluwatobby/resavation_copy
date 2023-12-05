import axios from 'axios';

const RESAVATION_URL = "https://resavation-service.onrender.com/api/v1/auth"
const RESAVATION_PUBLIC_URL = "https://resavation-service.onrender.com/api/v1"

const RESAVATION_AWS_URL = "http://ec2-52-16-38-31.eu-west-1.compute.amazonaws.com/api/v1/auth"
const RESAVATION_AWS_PUBLIC_URL = "http://ec2-52-16-38-31.eu-west-1.compute.amazonaws.com/api/v1"

const RESAVATION_NEW_URL = "http://backend.resavation.com/api/v1/auth"
const RESAVATION_NEW_PUBLIC_URL = "http://backend.resavation.com/api/v1"


const authAxios = axios.create({
  baseURL: RESAVATION_NEW_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

/**
 * @description axiosPublic - for fetching requests without token
*/
export const axiosPublic = axios.create({
  baseURL: RESAVATION_NEW_PUBLIC_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

export const axiosPrivate = axios.create({
  baseURL: RESAVATION_NEW_PUBLIC_URL,
  headers: { 'Content-Type': 'application/json' },
  // withCredentials: true
})

export default authAxios