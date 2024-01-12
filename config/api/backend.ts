import axios from "axios"

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
