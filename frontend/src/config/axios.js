// import axios from 'axios'

// export const axiosi=axios.create({withCredentials:true,baseURL:"http://localhost:8000"})
import axios from 'axios'

export const axiosi = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL
})
