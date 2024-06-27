import axios, { AxiosInstance, AxiosResponse } from 'axios'

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const API: AxiosInstance = axios.create({
  baseURL: BASE_URL
})

axios.interceptors.response.use(
  (response: AxiosResponse<any, any>) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export function urlSolver(path: string | undefined): string {
  if (path === null) return path

  if (!path) return ''

  const detectProtocol = new RegExp(/\:/, 'g')

  return detectProtocol.test(path) ? path : BASE_URL + path
}
