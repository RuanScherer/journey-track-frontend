import axios from "axios"

const HTTP_STATUS_UNAUTHORIZED = 401

export const backendClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export const backendServerSideClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_SERVER_SIDE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

backendClient.interceptors.response.use(
  (response) => response,
  (error) => responseErrorInterceptor(error)
)

function responseErrorInterceptor(error: any) {
  if (error.response.status === HTTP_STATUS_UNAUTHORIZED) {
    window.location.href = '/sign-in'
  }
  return Promise.reject(error)
}